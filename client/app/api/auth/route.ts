export async function POST(request: Request) {
  try {
    const res = await request.json();

    const sessionToken = res.payload.data.token;
    if (!sessionToken) {
      return new Response("Token not exist!", {
        status: 400,
      });
    }
    return Response.json(res.payload, {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly`,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
