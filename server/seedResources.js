import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Resource from './models/Resource.js';

dotenv.config();

const resources = [
    {
        "title": "Introduction to C Programming",
        "description": "Fundamental concepts of C for absolute beginners including syntax and execution flow.",
        "semester": "1",
        "subject": "Programming in C",
        "chapter": "Basics",
        "concept": "Syntax and Header Files",
        "type": "video",
        "link": "https://www.youtube.com/watch?v=7uK_6S_uKkg",
        "contributorName": "Smart Work Seed",
        "contributorId": ""
    },
    {
        "title": "Engineering Mathematics - Matrices Notes",
        "description": "Detailed explanation of Matrix operations, Rank, and Eigenvalues for engineering exams.",
        "semester": "1",
        "subject": "Engineering Mathematics I",
        "chapter": "Matrices",
        "concept": "Rank of Matrix",
        "type": "website",
        "link": "https://www.geeksforgeeks.org/rank-of-a-matrix/",
        "contributorName": "Smart Work Seed",
        "contributorId": ""
    },
    {
        "title": "Kirchhoff's Laws (KVL & KCL)",
        "description": "Simplified explanation of Kirchhoff's Voltage and Current Laws with solved numericals.",
        "semester": "1",
        "subject": "Basic Electrical Engineering",
        "chapter": "DC Circuits",
        "concept": "Kirchhoff's Laws",
        "type": "video",
        "link": "https://www.youtube.com/watch?v=id0T-0_V-Gg",
        "contributorName": "Smart Work Seed",
        "contributorId": ""
    },
    {
        "title": "C Data Types Summary",
        "description": "Quick reference for primitive data types in C programming.",
        "semester": "1",
        "subject": "Programming in C",
        "chapter": "Data Types",
        "concept": "Memory Allocation",
        "type": "text",
        "textContent": "C supports several data types: int, char, float, double. int is typically 2 or 4 bytes depending on architecture.",
        "contributorName": "Smart Work Seed",
        "contributorId": ""
    },
    {
        "title": "Lasers and Fiber Optics",
        "description": "Notes on Spontaneous and Stimulated emission for Physics theory paper.",
        "semester": "1",
        "subject": "Engineering Physics",
        "chapter": "Optics",
        "concept": "Laser Principles",
        "type": "pdf",
        "link": "https://nptel.ac.in/content/storage2/courses/115107095/module1/lecture1/lecture1.pdf",
        "contributorName": "Smart Work Seed",
        "contributorId": ""
    },

    {
        "title": "Object Oriented Programming Principles",
        "description": "Detailed lecture on Abstraction, Encapsulation, Inheritance, and Polymorphism.",
        "semester": "2",
        "subject": "C++ / OOP Basics",
        "chapter": "OOP Concepts",
        "concept": "Four Pillars of OOP",
        "type": "video",
        "link": "https://www.youtube.com/watch?v=Y86fUvY8p_0",
        "contributorName": "Smart Work Seed",
        "contributorId": ""
    },
    {
        "title": "Differential Equations Tutorial",
        "description": "Step-by-step guide to solving first order differential equations.",
        "semester": "2",
        "subject": "Engineering Mathematics II",
        "chapter": "Differential Equations",
        "concept": "Variable Separable Method",
        "type": "website",
        "link": "https://www.tutorialspoint.com/differential_equations/index.htm",
        "contributorName": "Smart Work Seed",
        "contributorId": ""
    },
    {
        "title": "PN Junction Diode Characteristics",
        "description": "Visual explanation of forward and reverse bias in semiconductor diodes.",
        "semester": "2",
        "subject": "Electronics Fundamentals",
        "chapter": "Semiconductors",
        "concept": "VI Characteristics",
        "type": "video",
        "link": "https://www.youtube.com/watch?v=Jm9AHe_uO_k",
        "contributorName": "Smart Work Seed",
        "contributorId": ""
    },

    {
        "title": "Linked List Operations",
        "description": "Abdul Bari's comprehensive guide to insertion, deletion and traversal in Linked Lists.",
        "semester": "3",
        "subject": "Data Structures",
        "chapter": "Linked Lists",
        "concept": "Singly Linked List",
        "type": "video",
        "link": "https://www.youtube.com/watch?v=dwD1z-63r_0",
        "contributorName": "Smart Work Seed",
        "contributorId": ""
    },

    {
        "title": "Dynamic Programming - 0/1 Knapsack",
        "description": "Abdul Bari explains the tabular approach to solving the Knapsack problem.",
        "semester": "4",
        "subject": "Design & Analysis of Algorithms",
        "chapter": "Dynamic Programming",
        "concept": "Knapsack Problem",
        "type": "video",
        "link": "https://www.youtube.com/watch?v=nLmhmB6NzcM",
        "contributorName": "Smart Work Seed",
        "contributorId": ""
    },

    {
        "title": "Normalization (1NF to BCNF)",
        "description": "Step-by-step table decomposition for database normalization.",
        "semester": "5",
        "subject": "DBMS",
        "chapter": "Normalization",
        "concept": "Functional Dependency",
        "type": "video",
        "link": "https://www.youtube.com/watch?v=UrYLYV7WshM",
        "contributorName": "Smart Work Seed",
        "contributorId": ""
    },

    {
        "title": "Linear Regression Explained",
        "description": "Mathematical intuition behind Simple Linear Regression for Machine Learning.",
        "semester": "6",
        "subject": "Machine Learning",
        "chapter": "Regression",
        "concept": "Cost Function",
        "type": "video",
        "link": "https://www.youtube.com/watch?v=E5RjzSK0fvY",
        "contributorName": "Smart Work Seed",
        "contributorId": ""
    },

    {
        "title": "A* Search Algorithm",
        "description": "Visual walkthrough of A* algorithm with heuristic functions.",
        "semester": "7",
        "subject": "Artificial Intelligence",
        "chapter": "Informed Search",
        "concept": "A* Algorithm",
        "type": "video",
        "link": "https://www.youtube.com/watch?v=vP5JDz4-vzc",
        "contributorName": "Smart Work Seed",
        "contributorId": ""
    },

    {
        "title": "Top 50 HR Interview Questions",
        "description": "Preparation guide for behavior-based interview questions.",
        "semester": "8",
        "subject": "Interview Preparation",
        "chapter": "Soft Skills",
        "concept": "HR Rounds",
        "type": "video",
        "link": "https://www.youtube.com/watch?v=W6D_f1pD_qE",
        "contributorName": "Smart Work Seed",
        "contributorId": ""
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        let insertedCount = 0;
        let skippedCount = 0;
        const toInsert = [];

        for (const resource of resources) {
            const exists = await Resource.findOne({
                title: resource.title,
                semester: resource.semester,
                subject: resource.subject
            });

            if (exists) {
                skippedCount++;
            } else {
                toInsert.push(resource);
            }
        }

        if (toInsert.length > 0) {
            const docs = await Resource.insertMany(toInsert);
            insertedCount = docs.length;
            console.log(`Successfully inserted ${insertedCount} resources.`);
            if (insertedCount > 0) {
                console.log(`Sample Inserted ID: ${docs[0]._id}`);
            }
        }

        console.log(`Skipped ${skippedCount} duplicate resources.`);

        process.exit();

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedDatabase();
