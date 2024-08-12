// app/api/getData/route.js
import dbConnect from '../../../../lib/mongodb'
import YourModel from '../../../../models/Post' // Replace with your model

export async function GET(request) {
  await dbConnect();

  try {
    // try to fetch al documenets from my collection if present then return with 200 
    const data = await YourModel.find(); // Fetch all documents from the collection
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // if document is not present then return 500 error response
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
