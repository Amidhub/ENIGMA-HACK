import CellTableProps from "@/types/CellTableProps";

const sendAnswer = async (item: CellTableProps) => {
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/tickets/${item.id}/send`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({item})
  });

  return await response.json();
}

export default sendAnswer;