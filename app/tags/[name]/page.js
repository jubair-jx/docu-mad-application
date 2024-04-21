import ContentDisplay from "@/components/ContentDisplay";
import { getDocuments } from "@/lib/doc";
import { getDocumentsByTags } from "@/utils/doc-utils";

const TagsPage = ({ params: { name } }) => {
  const docs = getDocuments();
  const matchedDocs = getDocumentsByTags(docs, name);
  return <ContentDisplay id={matchedDocs[0].id} />;
};

export default TagsPage;
