import { NextRequest, NextResponse } from 'next/server';
const Tavus_API_KEY = '1c7e269dcc374837a4b5d4bb8ec67b74';

async function deleteTavusConversation(conversationId: string) {

   const options = {method: 'DELETE', headers: {'x-api-key': Tavus_API_KEY}};

fetch(`https://tavusapi.com/v2/conversations/${conversationId}`, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get('conid');
  if (!conversationId) {
    console.error('No conversation ID provided');
    return NextResponse.redirect(`http://localhost:3000/?message=${encodeURIComponent('No conversation ID provided')}`);
  }
  try {
    await deleteTavusConversation(conversationId);
    return NextResponse.redirect(`http://localhost:3000/`);
  } catch (error: any) {
    console.error('Delete conversation error:', error);
    return NextResponse.redirect(`http://localhost:3000/?message=${encodeURIComponent('Call not ended')}`);
  }
}