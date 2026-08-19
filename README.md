# DormMates
 
A MERN app that splits recurring chores between roommates using automated round-robin rotation. Mark a chore done and it passes to the next person, resets its due date, and flags itself if it goes overdue.
 
## Tech Stack
 
MongoDB · Express · React · Node.js · Mongoose · React Router · Vite · Axios · Tailwind CSS
 
## Setup
 
**Backend**
```bash
cd server
npm install
```
 
Create `server/.env`:
```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```
 
```bash
node index.js
```
 
**Frontend** (in a second terminal)
```bash
cd client
npm install
npm run dev
```
 
Both need to run at the same time.
 
## Design Note
 
The visual design uses a preset color scheme and Tailwind CSS. 
<img width="1887" height="755" alt="image" src="https://github.com/user-attachments/assets/14993312-0616-4f55-8a9f-33e0d6cf6c55" />
<img width="1588" height="1178" alt="image" src="https://github.com/user-attachments/assets/2bd5a9b7-8540-4949-9730-cf6776b3bff6" />
<img width="1467" height="1098" alt="image" src="https://github.com/user-attachments/assets/a372c6c5-5e88-4548-9a9e-fc080d16ced3" />

 
## Contact
 
Maxim Zelikman · zelikmanmaxim@gmail.com 
