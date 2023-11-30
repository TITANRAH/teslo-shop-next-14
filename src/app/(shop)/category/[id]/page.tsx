import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function ({ params }: Props) {
  const { id } = params;

  if(id === 'kids'){
    notFound()
  }
  return (
    <div>
      <h1>Category Page {id}</h1>
    </div>
  );
}
