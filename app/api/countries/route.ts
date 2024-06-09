import { MOCK_GET_COUNTRIES } from "@/mocks/Country";
import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  try {
   /* const response = await axios.get(
      `http://api.countrylayer.com/v2/name/${searchParams.get("search")}`,
      { params: { access_key: process.env.ACCESS_KEY } }
    );
    const result = response.data;*/
  
    return Response.json(MOCK_GET_COUNTRIES)
  } catch (error) {
    //TODO: Config log to store error
    return  new Response(`API ERROR`, {
      status: 400,
    })
  }
;
}
