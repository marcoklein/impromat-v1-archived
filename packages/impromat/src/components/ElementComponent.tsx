import ReactMarkdown from "react-markdown";
import { ElementDocType } from "../database/collections/element/element-collection";
import { CustomElementInfoItemComponent } from "./CustomElementInfoItemComponent";
import { LicenseItemComponent } from "./LicenseItemComponent";
import { TagsComponent } from "./TagsComponent";

interface ContainerProps {
  element: ElementDocType;
}

export const ElementComponent: React.FC<ContainerProps> = ({ element }) => {
  return (
    <>
      <div className="ion-padding">
        <TagsComponent tags={element.tags}></TagsComponent>
        <ReactMarkdown>{element.markdown ?? ""}</ReactMarkdown>
      </div>
      {!element.basedOn && !element.sourceName ? (
        <CustomElementInfoItemComponent
          element={element}
        ></CustomElementInfoItemComponent>
      ) : (
        <LicenseItemComponent
          authorName={element.sourceName}
          authorUrl={element.sourceBaseUrl}
          licenseName={element.licenseName}
          licenseUrl={element.licenseUrl}
          name={element.name}
          sourceUrl={element.sourceUrl}
        ></LicenseItemComponent>
      )}
    </>
  );
};
