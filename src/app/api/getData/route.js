// app/api/getData/route.js
import dbConnect from '../../../../lib/mongodb'
import YourModel from '../../../../models/Post'

export async function GET(request) {
  await dbConnect();

  try {
    // Extract pagination parameters from the query
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 10;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch paginated documents
    const data = await YourModel.find().skip(skip).limit(limit);
    const totalDocuments = await YourModel.countDocuments(); // Get total document count

    return new Response(JSON.stringify({ data, totalDocuments }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
