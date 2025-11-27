"use client"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// Day names for tooltip
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Available years
const currentYear = new Date().getFullYear()
const availableYears = Array.from({ length: 10 }, (_, i) => currentYear - i)

// Generate mock contribution data (52 weeks x 7 days)
const generateMockData = (seed: number) => {
    // Simple seeded random for consistent data per year
    const seededRandom = (s: number) => {
        const x = Math.sin(s) * 10000
        return x - Math.floor(x)
    }
    let seedValue = seed
    const weeks = []
    for (let w = 0; w < 52; w++) {
        const days = []
        for (let d = 0; d < 7; d++) {
            seedValue++
            const rand = seededRandom(seedValue)
            // Random contribution count (0-15)
            const count = rand > 0.3 ? Math.floor(rand * 15) : 0
            days.push(count)
        }
        weeks.push(days)
    }
    return weeks
}

// Metallic green color based on contribution count (GitHub style)
const getMetallicMaterial = (count: number) => {
    let color: number
    let emissiveIntensity = 0.1

    if (count === 0) {
        color = 0x161b22
        emissiveIntensity = 0
    } else if (count <= 3) {
        color = 0x0e4429
        emissiveIntensity = 0.08
    } else if (count <= 6) {
        color = 0x006d32
        emissiveIntensity = 0.15
    } else if (count <= 9) {
        color = 0x26a641
        emissiveIntensity = 0.2
    } else {
        color = 0x39d353
        emissiveIntensity = 0.25
    }

    return new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.9,
        roughness: 0.2,
        emissive: color,
        emissiveIntensity: emissiveIntensity,
    })
}

interface BoxUserData {
    weekIndex: number
    dayIndex: number
    count: number
    originalHeight: number
    targetScale: number
    currentScale: number
}

const TestPage = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [selectedYear, setSelectedYear] = useState(currentYear.toString())
    const [tooltip, setTooltip] = useState<{
        visible: boolean
        x: number
        y: number
        week: number
        day: string
        count: number
    }>({ visible: false, x: 0, y: 0, week: 0, day: "", count: 0 })

    useEffect(() => {
        if (!containerRef.current) return

        const container = containerRef.current
        const width = container.clientWidth
        const height = container.clientHeight

        // Scene
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x0a0a0f)

        // Camera
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
        camera.position.set(0, 30, 50)
        camera.lookAt(0, 0, 0)

        // Renderer with tone mapping for better metallic look
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(width, height)
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.2
        container.appendChild(renderer.domElement)

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.target.set(0, 0, 0)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.minDistance = 40
        controls.maxDistance = 100

        // Lighting for metallic effect - increased for better visibility
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        // Main directional light - brighter
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
        directionalLight.position.set(50, 50, 50)
        scene.add(directionalLight)

        // Secondary light for reflections - green tinted
        const directionalLight2 = new THREE.DirectionalLight(0x39d353, 0.6)
        directionalLight2.position.set(-30, 30, -30)
        scene.add(directionalLight2)

        // Point light for highlights - green accent
        const pointLight = new THREE.PointLight(0x39d353, 1.0, 100)
        pointLight.position.set(0, 25, 0)
        scene.add(pointLight)

        // Additional fill light from below for more dimension
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.4)
        fillLight.position.set(0, -20, 30)
        scene.add(fillLight)

        // Generate mock data based on selected year
        const contributionData = generateMockData(parseInt(selectedYear))

        // Create contribution boxes with rounded corners
        const boxSize = 0.8
        const gap = 0.2
        const totalSize = boxSize + gap
        const cornerRadius = 0.1
        const cornerSegments = 3
        const minHeight = 0.2

        // Center offset - account for the grid spanning from index 0 to max index
        const offsetX = ((52 - 1) * totalSize) / 2
        const offsetZ = ((7 - 1) * totalSize) / 2

        // Store all boxes for raycasting and animation
        const boxes: THREE.Mesh[] = []

        contributionData.forEach((week, weekIndex) => {
            week.forEach((count, dayIndex) => {
                const boxHeight = count === 0 ? minHeight : minHeight + count * 0.3

                // RoundedBoxGeometry(width, height, depth, segments, radius)
                const geometry = new RoundedBoxGeometry(
                    boxSize,
                    boxHeight,
                    boxSize,
                    cornerSegments,
                    cornerRadius
                )

                const material = getMetallicMaterial(count)
                const box = new THREE.Mesh(geometry, material)

                box.position.x = weekIndex * totalSize - offsetX
                box.position.y = boxHeight / 2
                box.position.z = dayIndex * totalSize - offsetZ

                // Store metadata for hover interaction
                box.userData = {
                    weekIndex,
                    dayIndex,
                    count,
                    originalHeight: boxHeight,
                    targetScale: 1,
                    currentScale: 1,
                } as BoxUserData

                boxes.push(box)
                scene.add(box)
            })
        })

        // Reflective base plane
        const planeGeometry = new THREE.PlaneGeometry(60, 10)
        const planeMaterial = new THREE.MeshStandardMaterial({
            color: 0x0a0a0f,
            metalness: 0.5,
            roughness: 0.8,
        })
        const plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.rotation.x = -Math.PI / 2
        plane.position.y = -0.1
        scene.add(plane)

        // Raycaster for hover detection
        const raycaster = new THREE.Raycaster()
        const mouse = new THREE.Vector2()
        let hoveredBox: THREE.Mesh | null = null

        const onMouseMove = (event: MouseEvent) => {
            const rect = container.getBoundingClientRect()
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

            raycaster.setFromCamera(mouse, camera)
            const intersects = raycaster.intersectObjects(boxes)

            if (intersects.length > 0) {
                const intersectedBox = intersects[0].object as THREE.Mesh

                if (hoveredBox !== intersectedBox) {
                    hoveredBox = intersectedBox
                    const userData = hoveredBox.userData as BoxUserData

                    // Set all boxes to collapse except the hovered one
                    boxes.forEach((box) => {
                        const boxData = box.userData as BoxUserData
                        if (box === hoveredBox) {
                            boxData.targetScale = 1
                        } else {
                            boxData.targetScale = minHeight / boxData.originalHeight
                        }
                    })

                    // Show tooltip
                    setTooltip({
                        visible: true,
                        x: event.clientX - rect.left,
                        y: event.clientY - rect.top,
                        week: userData.weekIndex + 1,
                        day: dayNames[userData.dayIndex],
                        count: userData.count,
                    })
                } else {
                    // Update tooltip position
                    const rect = container.getBoundingClientRect()
                    const userData = hoveredBox.userData as BoxUserData
                    setTooltip((prev) => ({
                        ...prev,
                        x: event.clientX - rect.left,
                        y: event.clientY - rect.top,
                    }))
                }
            } else {
                if (hoveredBox !== null) {
                    hoveredBox = null
                    // Restore all boxes to original scale
                    boxes.forEach((box) => {
                        const boxData = box.userData as BoxUserData
                        boxData.targetScale = 1
                    })
                    setTooltip((prev) => ({ ...prev, visible: false }))
                }
            }
        }

        const onMouseLeave = () => {
            hoveredBox = null
            boxes.forEach((box) => {
                const boxData = box.userData as BoxUserData
                boxData.targetScale = 1
            })
            setTooltip((prev) => ({ ...prev, visible: false }))
        }

        container.addEventListener("mousemove", onMouseMove)
        container.addEventListener("mouseleave", onMouseLeave)

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate)

            // Animate box heights using scale (much faster than recreating geometry)
            boxes.forEach((box) => {
                const userData = box.userData as BoxUserData
                const diff = userData.targetScale - userData.currentScale

                if (Math.abs(diff) > 0.001) {
                    userData.currentScale += diff * 0.15 // Smooth animation
                    box.scale.y = userData.currentScale
                    box.position.y = (userData.originalHeight * userData.currentScale) / 2
                }
            })

            controls.update()
            renderer.render(scene, camera)
        }
        animate()

        // Handle resize
        const handleResize = () => {
            const newWidth = container.clientWidth
            const newHeight = container.clientHeight
            camera.aspect = newWidth / newHeight
            camera.updateProjectionMatrix()
            renderer.setSize(newWidth, newHeight)
        }
        window.addEventListener("resize", handleResize)

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize)
            container.removeEventListener("mousemove", onMouseMove)
            container.removeEventListener("mouseleave", onMouseLeave)
            container.removeChild(renderer.domElement)
            renderer.dispose()
        }
    }, [selectedYear])

    return (
        <div className="container py-12">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">3D GitHub Contributions</h1>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableYears.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
                Mock data - Drag to rotate, scroll to zoom, hover to see details
            </p>
            <div
                ref={containerRef}
                className="relative w-full h-[500px] rounded-lg overflow-hidden border border-gray-700"
            >
                {tooltip.visible && (
                    <div
                        className="absolute pointer-events-none bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-lg border border-gray-700 z-10"
                        style={{
                            left: tooltip.x + 15,
                            top: tooltip.y - 10,
                            transform: "translateY(-100%)",
                        }}
                    >
                        <div className="font-semibold">Week {tooltip.week}, {tooltip.day}</div>
                        <div className="text-green-400">
                            {tooltip.count} contribution{tooltip.count !== 1 ? "s" : ""}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TestPage
