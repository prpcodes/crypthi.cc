# 🍑 Crypthi.cc

This project is a secure message application, designed to prioritize your privacy! It is built using SvelteKit and Supabase. The unique features of this application make sure that the messages are always encrypted and hashed to ensure security and confidentiality.

|  ![Creation](/static/creation.png)   |     ![Created](/static/created.png)     |
| :----------------------------------: | :-------------------------------------: |
| ![Decryption](/static/decrytion.png) | ![Destruction](/static/destruction.png) |

## 🌟 Features

- Create a new secure message
- View an existing secure message (only if you possess the correct password)
- Delete an existing secure message (only if you possess the correct password)

## 🚀 Setup your own instance

To setup this project, ensure you have Node.js and npm installed.

Clone the repository:

```bash
git clone https://github.com/<your-github-username>/secure-message-application.git
```

Navigate into the project folder:

```bash
cd secure-message-application
```

Install dependencies:

```bash
npm install
```

Create a .env file at the root of your project and fill it with your Supabase URL and anonymous key:

```bash
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Run the project:

```
bash
Copy code
npm run dev
```

## 📋 Usage

### 📬 Create a New Message

Navigate to / in your browser. Enter your message and a password, then click "Encrypt Message". The encrypted message will be stored on the server, and you'll be given a unique ID for the message.

### 👀 View an Existing Message

Navigate to /message-id in your browser. Replace message-id with the ID of the message you want to view. Enter the password to and click "Decrypt Message".

### 🗑️ Delete an Existing Message

You can only delete a message if you know the password. To delete a message, you would first navigate to the message /message-id, decrypt the message and hit "Delete Message".

### 🛡️ Security

This application ensures the security of your messages in two ways:

Message encryption: The messages are encrypted on the client side using AES-256 encryption before being stored on the server. This means that even if someone were to gain unauthorized access to the server, they would not be able to read your messages without the password.

Password hashing: The passwords are hashed using bcrypt before being stored on the server. This means that even if someone were to gain unauthorized access to the server, they would not be able to figure out your password.

## 🙌 Contributing

Contributions are welcome! Please submit a pull request with any improvements.

## 📃 License

This project is licensed under the MIT License.

> 💡 NOTE: Always remember, no security measure is 100% foolproof. Therefore, please use this application responsibly and do not rely on it for extremely sensitive information.
