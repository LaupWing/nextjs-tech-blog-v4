"use client"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"
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
import { Accent } from "@/components/Accent"

// Day names for tooltip
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Current year
const currentYear = new Date().getFullYear()

// Rotating taglines
const taglines = [
    "The proof of skill is in the commits",
    "Every green square tells a story",
    "Daily discipline, daily code",
    "Consistency beats talent",
    "Building the future, one commit at a time",
    "Code is my daily habit",
    "Passion measured in contributions",
    "Where dedication meets code",
]

// Box configuration
const BOX_SIZE = 0.8
const GAP = 0.2
const TOTAL_SIZE = BOX_SIZE + GAP
const CORNER_RADIUS = 0.1
const CORNER_SEGMENTS = 3
const MIN_HEIGHT = 0.2
const MAX_HEIGHT = 0.2 + 30 * 0.15

// Get color based on contribution count
const getColor = (count: number) => {
    if (count === 0) return { color: 0x161b22, emissive: 0 }
    if (count <= 3) return { color: 0x0e4429, emissive: 0.08 }
    if (count <= 6) return { color: 0x006d32, emissive: 0.15 }
    if (count <= 9) return { color: 0x26a641, emissive: 0.2 }
    return { color: 0x39d353, emissive: 0.25 }
}

// Calculate height from count
const getHeightFromCount = (count: number) => {
    if (count === 0) return MIN_HEIGHT
    return MIN_HEIGHT + Math.min(count, 30) * 0.15
}

interface BoxUserData {
    weekIndex: number
    dayIndex: number
    count: number
    date: string
    baseHeight: number
    targetHeight: number
    currentHeight: number
    isHovered: boolean
}

// Fetch available years from API
const fetchAvailableYears = async () => {
    try {
        const response = await fetch(`/api/github/contributions?info=true`)
        const data = await response.json()
        if (data.error) {
            console.error("API error:", data.error)
            return [currentYear]
        }
        return data.availableYears as number[]
    } catch (error) {
        console.error("Failed to fetch available years:", error)
        return [currentYear]
    }
}

// Fetch contributions from API
const fetchContributions = async (year: number) => {
    try {
        const response = await fetch(`/api/github/contributions?year=${year}`)
        const data = await response.json()
        if (data.error) {
            console.error("API error:", data.error)
            return null
        }
        return data.contributions as number[][]
    } catch (error) {
        console.error("Failed to fetch contributions:", error)
        return null
    }
}

interface GitHubContributions3DProps {
    className?: string
}

export const GitHubContributions3D = ({ className }: GitHubContributions3DProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const sceneRef = useRef<{
        scene: THREE.Scene
        camera: THREE.PerspectiveCamera
        renderer: THREE.WebGLRenderer
        controls: OrbitControls
        boxes: THREE.Mesh[]
        animationId: number
    } | null>(null)
    const [selectedYear, setSelectedYear] = useState("2024")
    const [availableYears, setAvailableYears] = useState<number[]>([currentYear])
    const [isLoading, setIsLoading] = useState(true)
    const [taglineIndex, setTaglineIndex] = useState(0)
    const [tooltip, setTooltip] = useState<{
        visible: boolean
        x: number
        y: number
        week: number
        day: string
        count: number
        date: string
    }>({ visible: false, x: 0, y: 0, week: 0, day: "", count: 0, date: "" })

    // Fetch available years on mount
    useEffect(() => {
        const loadAvailableYears = async () => {
            const years = await fetchAvailableYears()
            setAvailableYears(years)
        }
        loadAvailableYears()
    }, [])

    // Rotate taglines
    useEffect(() => {
        const interval = setInterval(() => {
            setTaglineIndex((prev) => (prev + 1) % taglines.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    // Update contribution data when year changes
    const updateContributionData = useCallback(async (year: number) => {
        if (!sceneRef.current) return

        setIsLoading(true)
        const contributionData = await fetchContributions(year)
        setIsLoading(false)

        if (!contributionData) return

        const { boxes } = sceneRef.current

        boxes.forEach((box) => {
            const userData = box.userData as BoxUserData
            const { weekIndex, dayIndex } = userData

            // Handle variable week lengths from GitHub API
            const count = contributionData[weekIndex]?.[dayIndex] ?? 0
            const newHeight = getHeightFromCount(count)

            // Calculate date for this cell
            const startDate = new Date(year, 0, 1)
            const dayOfYear = weekIndex * 7 + dayIndex
            const cellDate = new Date(startDate)
            cellDate.setDate(startDate.getDate() + dayOfYear - startDate.getDay())

            // Update user data
            userData.count = count
            userData.date = cellDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            })
            userData.baseHeight = newHeight
            userData.targetHeight = newHeight

            // Update material color
            const { color, emissive } = getColor(count)
            const material = box.material as THREE.MeshStandardMaterial
            material.color.setHex(color)
            material.emissive.setHex(color)
            material.emissiveIntensity = emissive
        })
    }, [])

    // Initialize scene once
    useEffect(() => {
        if (!containerRef.current) return

        const container = containerRef.current
        const width = container.clientWidth
        const height = container.clientHeight

        // Scene
        const scene = new THREE.Scene()
        scene.background = null // Transparent background

        // Check if mobile for initial camera position
        const isMobileView = width < 768

        // Camera - closer on desktop, further on mobile
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
        const cameraZ = isMobileView ? 65 : 40
        camera.position.set(0, 25, cameraZ)
        camera.lookAt(0, 0, 0)

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
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
        controls.minDistance = 25
        controls.maxDistance = 120

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
        directionalLight.position.set(50, 50, 50)
        scene.add(directionalLight)

        const directionalLight2 = new THREE.DirectionalLight(0x39d353, 0.6)
        directionalLight2.position.set(-30, 30, -30)
        scene.add(directionalLight2)

        const pointLight = new THREE.PointLight(0x39d353, 1.0, 100)
        pointLight.position.set(0, 25, 0)
        scene.add(pointLight)

        const fillLight = new THREE.DirectionalLight(0xffffff, 0.4)
        fillLight.position.set(0, -20, 30)
        scene.add(fillLight)

        // Center offset
        const offsetX = ((53 - 1) * TOTAL_SIZE) / 2
        const offsetZ = ((7 - 1) * TOTAL_SIZE) / 2

        // Create boxes (53 weeks to handle year boundaries)
        const boxes: THREE.Mesh[] = []

        for (let weekIndex = 0; weekIndex < 53; weekIndex++) {
            for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
                const boxHeight = MIN_HEIGHT

                const geometry = new RoundedBoxGeometry(
                    BOX_SIZE,
                    MAX_HEIGHT,
                    BOX_SIZE,
                    CORNER_SEGMENTS,
                    CORNER_RADIUS
                )

                const { color, emissive } = getColor(0)
                const material = new THREE.MeshStandardMaterial({
                    color: color,
                    metalness: 0.9,
                    roughness: 0.2,
                    emissive: color,
                    emissiveIntensity: emissive,
                })

                const box = new THREE.Mesh(geometry, material)
                box.position.x = weekIndex * TOTAL_SIZE - offsetX
                box.position.z = dayIndex * TOTAL_SIZE - offsetZ

                const scale = boxHeight / MAX_HEIGHT
                box.scale.y = scale
                box.position.y = (MAX_HEIGHT * scale) / 2

                box.userData = {
                    weekIndex,
                    dayIndex,
                    count: 0,
                    date: "",
                    baseHeight: boxHeight,
                    targetHeight: boxHeight,
                    currentHeight: boxHeight,
                    isHovered: false,
                } as BoxUserData

                boxes.push(box)
                scene.add(box)
            }
        }


        // Raycaster for hover
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

                    // Collapse all except hovered
                    boxes.forEach((box) => {
                        const boxData = box.userData as BoxUserData
                        if (box === hoveredBox) {
                            boxData.targetHeight = boxData.baseHeight
                            boxData.isHovered = true
                        } else {
                            boxData.targetHeight = MIN_HEIGHT
                            boxData.isHovered = false
                        }
                    })

                    setTooltip({
                        visible: true,
                        x: event.clientX - rect.left,
                        y: event.clientY - rect.top,
                        week: userData.weekIndex + 1,
                        day: dayNames[userData.dayIndex],
                        count: userData.count,
                        date: userData.date,
                    })
                } else {
                    setTooltip((prev) => ({
                        ...prev,
                        x: event.clientX - rect.left,
                        y: event.clientY - rect.top,
                    }))
                }
            } else {
                if (hoveredBox !== null) {
                    hoveredBox = null
                    boxes.forEach((box) => {
                        const boxData = box.userData as BoxUserData
                        boxData.targetHeight = boxData.baseHeight
                        boxData.isHovered = false
                    })
                    setTooltip((prev) => ({ ...prev, visible: false }))
                }
            }
        }

        const onMouseLeave = () => {
            hoveredBox = null
            boxes.forEach((box) => {
                const boxData = box.userData as BoxUserData
                boxData.targetHeight = boxData.baseHeight
                boxData.isHovered = false
            })
            setTooltip((prev) => ({ ...prev, visible: false }))
        }

        container.addEventListener("mousemove", onMouseMove)
        container.addEventListener("mouseleave", onMouseLeave)

        // Animation loop
        const animate = () => {
            const animationId = requestAnimationFrame(animate)
            if (sceneRef.current) {
                sceneRef.current.animationId = animationId
            }

            // Animate box heights
            boxes.forEach((box) => {
                const userData = box.userData as BoxUserData
                const diff = userData.targetHeight - userData.currentHeight

                if (Math.abs(diff) > 0.01) {
                    userData.currentHeight += diff * 0.12
                    const scale = userData.currentHeight / MAX_HEIGHT
                    box.scale.y = scale
                    box.position.y = (MAX_HEIGHT * scale) / 2
                }
            })

            controls.update()
            renderer.render(scene, camera)
        }

        const animationId = requestAnimationFrame(animate)

        // Store refs
        sceneRef.current = {
            scene,
            camera,
            renderer,
            controls,
            boxes,
            animationId,
        }

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
            cancelAnimationFrame(sceneRef.current?.animationId || 0)
            container.removeChild(renderer.domElement)
            renderer.dispose()
            sceneRef.current = null
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Update data when year changes
    useEffect(() => {
        updateContributionData(parseInt(selectedYear))
    }, [selectedYear, updateContributionData])

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-[350px] rounded-lg overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.15)] dark:shadow-[0_0_25px_rgba(255,255,255,0.1)] ${className || ""}`}
        >
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 z-20">
                    <div className="text-white">Loading contributions...</div>
                </div>
            )}
            <div className="absolute top-4 left-4 z-10 max-w-[200px] md:max-w-[300px]">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={taglineIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="text-sm md:text-base font-medium italic"
                    >
                        <Accent>"{taglines[taglineIndex]}"</Accent>
                    </motion.p>
                </AnimatePresence>
            </div>
            <div className="absolute bottom-4 left-4 md:top-4 md:bottom-auto md:right-4 md:left-auto z-10">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-[120px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-300 dark:border-gray-700">
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
            {tooltip.visible && (
                <div
                    className="absolute pointer-events-none bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-lg border border-gray-700 z-10"
                    style={{
                        left: tooltip.x + 15,
                        top: tooltip.y - 10,
                        transform: "translateY(-100%)",
                    }}
                >
                    <div className="font-semibold">{tooltip.date}</div>
                    <div className="text-gray-400">{tooltip.day}</div>
                    <div className="text-green-400">
                        {tooltip.count} contribution{tooltip.count !== 1 ? "s" : ""}
                    </div>
                </div>
            )}
        </div>
    )
}

export default GitHubContributions3D
