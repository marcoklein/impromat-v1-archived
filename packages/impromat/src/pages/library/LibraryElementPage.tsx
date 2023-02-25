import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { useMutation, useQuery } from "urql";
import { ElementComponent } from "../../components/ElementComponent";
import { graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useSearchParam } from "../../hooks/use-search-params";
import { useStateChangeLogger } from "../../hooks/use-state-change-logger";
import { routeLibrary } from "./library-routes";
import { WORKSHOP_CONTEXT_SEARCH_PARAM } from "./workshop-context-search-param";

const LibraryElementQuery = graphql(`
  query LibraryElementQuery($id: ID!) {
    element(id: $id) {
      id
      name
      ...Element_Element
    }
  }
`);

const WorkshopQuery = graphql(`
  query WorkshopSectionsQuery($id: ID!) {
    workshop(id: $id) {
      sections {
        id
      }
    }
  }
`);

const AddToWorkshopMutation = graphql(`
  mutation AddToWorkhopMutation($input: UpdateWorkshopInput!) {
    updateWorkshop(input: $input) {
      id
    }
  }
`);

export const LibraryElementPage: React.FC = () => {
  const { libraryPartId } = useParams<{
    libraryPartId: string;
  }>();
  const workshopId = useSearchParam(WORKSHOP_CONTEXT_SEARCH_PARAM);
  const logger = useComponentLogger("ImprobibElementPage");
  useStateChangeLogger(workshopId, "workshopId", logger);
  useStateChangeLogger(libraryPartId, "libraryPartId", logger);

  const [elementQueryResult] = useQuery({
    query: LibraryElementQuery,
    variables: {
      id: libraryPartId,
    },
  });
  const [workshopQueryResult] = useQuery({
    query: WorkshopQuery,
    variables: {
      id: workshopId ?? "",
    },
    pause: !workshopId,
  });
  const [, addToWorkshopMutation] = useMutation(AddToWorkshopMutation);
  const element = elementQueryResult.data?.element;
  const history = useHistory();

  function addToWorkshop() {
    if (!element) return;
    if (!workshopId) throw new Error("no workshop id");
    if (!workshopQueryResult.data) throw new Error("workshop not found");
    const lastSectionId = workshopQueryResult.data.workshop.sections.at(-1)?.id;
    if (!lastSectionId) throw new Error("no last section id");

    addToWorkshopMutation({
      input: {
        id: workshopId,
        sections: {
          update: [
            {
              id: lastSectionId,
              elements: {
                create: [
                  {
                    basedOn: {
                      connect: {
                        id: element.id,
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    }).then(() => {
      history.push(`/workshop/${workshopId}`, {
        direction: "back",
        newElement: "last",
      });
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={routeLibrary({ workshopId })}
            ></IonBackButton>
          </IonButtons>
          <IonTitle>{element?.name}</IonTitle>
          {/* <IonButtons slot="end">
            <IonButton onClick={() => onStarElementClick()}>
              <IonIcon
                slot="icon-only"
                icon={isFavoriteElement ? star : starOutline}
              ></IonIcon>
            </IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {element ? (
          <ElementComponent elementFragment={element}></ElementComponent>
        ) : (
          <IonSpinner></IonSpinner>
        )}
      </IonContent>
      {workshopId && (
        <IonFooter>
          <IonToolbar>
            <IonButton
              onClick={() => {
                addToWorkshop();
              }}
              color="primary"
              expand="full"
              fill="solid"
            >
              Add to Workshop
            </IonButton>
          </IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
};
