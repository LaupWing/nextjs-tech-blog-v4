## Todo

-   [ ] Fix the css file if I have the time

## Email Setup (Contact Form)

The contact form sends email notifications using Gmail. Follow these steps to set it up:

### 1. Add environment variables

Add these to your `.env` file:

```
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-app-password
```

### 2. Get a Gmail App Password

1. Go to your Google Account: https://myaccount.google.com
2. Click **Security** in the left menu
3. Under "How you sign in to Google", make sure **2-Step Verification** is ON
4. After enabling 2-Step Verification, go back to Security
5. Search for **App passwords** or go to: https://myaccount.google.com/apppasswords
6. Select app: **Mail**
7. Select device: **Other** (type "Tech Blog" or any name)
8. Click **Generate**
9. Copy the 16-character password (looks like: `abcd efgh ijkl mnop`)
10. Use this as `GMAIL_APP_PASSWORD` (without spaces)

### Example `.env`:
```
GMAIL_USER=laupwing@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

## Prisma

--- Next steps ---

Go to https://pris.ly/ppg-init for detailed instructions.

1. Define your database schema
   Open the schema.prisma file and define your first models. Check the docs if you need inspiration: https://pris.ly/ppg-init.

2. Apply migrations
   Run the following command to create and apply a migration:
   npx prisma migrate dev --name init

3. Manage your data
   View and edit your data locally by running this command:
   npx prisma studio

...or online in Console:
https://console.prisma.io/cmfpjqt11003iykfll455htv9/cmfpjrffv006hx0eaz3y3qmgo/cmfpjrffv006ix0easir9jz4d/studio

4. Send queries from your app
   To access your database from a JavaScript/TypeScript app, you need to use Prisma ORM. Go here for step-by-step instructions: https://pris.ly/ppg-init
