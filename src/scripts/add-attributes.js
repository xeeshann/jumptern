// src/scripts/add-attributes.js
import { Client, Databases } from 'node-appwrite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY); // You need an API key with proper permissions

const databases = new Databases(client);

async function addReadingTimeAttribute() {
  try {
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
    
    await databases.createIntegerAttribute(
      databaseId,
      collectionId,
      'readingTime',
      false, // required
      1      // default value (1 minute minimum)
    );
    
    console.log('Successfully added readingTime attribute to the collection');
  } catch (error) {
    if (error.code === 409) {
      console.log('Attribute readingTime already exists');
    } else {
      console.error('Error adding readingTime attribute:', error);
    }
  }
}

// Add Table of Contents attribute if needed
async function addTableOfContentsAttribute() {
  try {
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
    
    await databases.createStringAttribute(
      databaseId,
      collectionId,
      'toc',
      false, // required
      65535  // max length (large enough for TOC JSON)
    );
    
    console.log('Successfully added toc attribute to the collection');
  } catch (error) {
    if (error.code === 409) {
      console.log('Attribute toc already exists');
    } else {
      console.error('Error adding toc attribute:', error);
    }
  }
}

// Run setup
async function setup() {
  try {
    console.log('Starting setup...');
    console.log('Database ID:', process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID);
    console.log('Collection ID:', process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID);
    
    await addReadingTimeAttribute();
    await addTableOfContentsAttribute();
    
    console.log('Setup complete!');
  } catch (error) {
    console.error('Setup failed:', error);
  }
}

setup();