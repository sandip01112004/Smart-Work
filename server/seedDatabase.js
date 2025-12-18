import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js';
import Resource from './models/Resource.js';
// Import other models if needed, e.g. Class if you have one, currently schema only mentioned User/Resource/Bookmark
// But the JSON has "classes". I need to check if I have a Class model.
// Looking at previous file history, I only saw Resource.js and User.js and proper bookmark handling in controllers.
// Wait, the user asked for "Class" in the JSON requirement, but I haven't created a Class model yet in the project.
// The current app implementation uses "semester" and "subject" strings in Resource, not a separate Class entity.
// So for now, I will only seed Users and Resources. The "classes" data in JSON might be for future use or I should strictly follow the JSON structure but only use what I have models for.
// Actually, looking at the JSON, it has "classes".
// The user's prompt asked for "Class" schema in the data generation.
// "Class name like a real Indian engineering college batch... Subjects -> Chapters -> Concepts"
// My current Resource model just has semester/subject/chapter/concept strings.
// To fully utilize the "classes" data, I might need a Class model, OR I can just ignore it for now and relying on the Resources having the correct strings.
// However, the Resources in the JSON *do* have the correct strings: "semester": "5", "subject": "Database Management Systems", etc.
// So inserting Resources is sufficient for the current app to work.
// I will just log that I am skipping "classes" for now or just insert Users and Resources.

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected via Seed Script');

        const dataPath = path.join(__dirname, 'seed_data.json');
        const data = JSON.parse(await fs.readFile(dataPath, 'utf-8'));

        // Clear existing data
        await User.deleteMany({});
        await Resource.deleteMany({});
        console.log('Existing data cleared');

        // Insert Users
        if (data.users && data.users.length > 0) {
            await User.insertMany(data.users);
            console.log(`Imported ${data.users.length} Users`);
        }

        // Insert Resources
        if (data.resources && data.resources.length > 0) {
            await Resource.insertMany(data.resources);
            console.log(`Imported ${data.resources.length} Resources`);
        }

        // Checking for Classes
        // Since we don't have a Class model explicitly defined in the previous steps (only User, Resource, Bookmark logic),
        // and the app relies on string matching for Semester/Subject in Resources, we are good with just creating Resources.
        // The "classes" section of the JSON essentially describes the metadata structure which the frontend might hardcode or fetch,
        // but right now the backend stores data flattened in Resources.

        console.log('Seeding Complete!');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
