import ReactMarkdown from "react-markdown";
import { ElementDocType } from "../store/collections/element-collection";
import { LicenseItemComponent } from "./LicenseItemComponent";
import { TagsComponent } from "./TagsComponent";

interface ContainerProps {
  element: ElementDocType;
}

export const WorkshopElementComponent: React.FC<ContainerProps> = ({
  element,
}) => {
  return (
    <>
      <TagsComponent tags={element.tags}></TagsComponent>
      <ReactMarkdown>{element.markdown ?? ""}</ReactMarkdown>
      <LicenseItemComponent
        authorName={element.sourceName}
        authorUrl={element.sourceBaseUrl}
        licenseName={element.licenseName}
        licenseUrl={element.licenseUrl}
        name={element.name}
        sourceUrl={element.sourceUrl}
      ></LicenseItemComponent>
    </>
  );
};
