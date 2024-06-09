// import { MOCK_GET_COUNTRIES } from "@/mocks/Country"; //Swap MOCK so I don't consume api credits while testing
import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  try {
    const response = await axios.get(
      `http://api.countrylayer.com/v2/name/${searchParams.get("search")}`,
      { params: { access_key: process.env.ACCESS_KEY } }
    );

    //return Response.json(MOCK_GET_COUNTRIES);
    return Response.json(response.data);
  } catch (error) {
    //TODO: Config log to store error
    console.log(error)
    return new Response(`API ERROR`, {
      status: 400,
      
    });
  }
}
