import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useCallback, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useMutation, useQuery } from "urql";
import { EditableItemComponent } from "../../components/EditableItemComponent";
import { getFragmentData, graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useInputDialog } from "../../hooks/use-input-dialog";
import { routeWorkshops } from "../../routes/shared-routes";
import { routeLibrary } from "../library/library-routes";
import {
  WorkshopActionSheetComponent,
  WorkshopActionTypes,
} from "./components/WorkshopActionSheetComponent";
import { WorkshopElementsComponent } from "./components/WorkshopElementsComponent";

const WorkshopPage_Workshop = graphql(`
  fragment WorkshopPage_Workshop on Workshop {
    id
    version
    createdAt
    updatedAt
    deleted
    name
    description
    sections {
      name
      elements {
        id
      }
      ...WorkshopElementsComponent_WorkshopSection
    }
    ...WorkshopActionSheet_Workshop
  }
`);

const WorkshopByIdQuery = graphql(`
  query WorkshopByIdQuery($id: ID!) {
    workshop(id: $id) {
      ...WorkshopPage_Workshop
    }
  }
`);

export const WorkshopPage: React.FC = () => {
  const { id: workshopId } = useParams<{ id: string }>();
  const history = useHistory();

  const [workshopResult] = useQuery({
    query: WorkshopByIdQuery,
    variables: {
      id: workshopId,
    },
  });
  const workshop = getFragmentData(
    WorkshopPage_Workshop,
    workshopResult.data?.workshop,
  );

  const [, deleteWorkshopMutation] = useMutation(
    graphql(`
      mutation DeleteWorkshopMutation($id: ID!) {
        deleteWorkshop(id: $id) {
          id
        }
      }
    `),
  );

  const [, updateWorkshopMutation] = useMutation(
    graphql(`
      mutation UpdateWorkshop($input: UpdateWorkshopInput!) {
        updateWorkshop(input: $input) {
          id
        }
      }
    `),
  );

  const logger = useComponentLogger("WorkshopPage");

  useEffect(() => {
    logger("Workshop changed to %O", workshop);
  }, [workshop, logger]);

  const [presentInputDialog] = useInputDialog();

  const changeWorkshopName = (newName: string) => {
    if (!workshop) return;
    updateWorkshopMutation({ input: { id: workshop.id, name: newName } });
  };
  const changeWorkshopDescription = (newDescription: string) => {
    if (!workshop) return;
    updateWorkshopMutation({
      input: { id: workshop.id, description: newDescription },
    });
  };
  const changeSectionsOrder = (fromIndex: number, toIndex: number) => {
    throw new Error("not implemented");
    // if (!mutations || !workshop) return;
    // TODO implement sorting

    // (async () => {
    //   const populatedSection = await workshop.sections_;
    //   const { sections } = WORKSHOP_HELPER.moveItemFromIndexToIndex(
    //     populatedSection.map((section) => section.toMutableJSON()),
    //     fromIndex,
    //     toIndex,
    //   );
    //   await Promise.all([
    //     database.sections.bulkUpsert(sections),
    //     workshop.atomicUpdate((draft) => {
    //       draft.sections = sections.map(({ id }) => id);
    //       return draft;
    //     }),
    //   ]);
    // })();
  };

  const onDeleteWorkshop = useCallback(() => {
    logger("not implemented");
    // TODO add confirmation dialog
    deleteWorkshopMutation({ id: workshopId }).then(() => {
      history.push(routeWorkshops(), { direction: "back" });
      logger("Deleted workshop");
    });
  }, [deleteWorkshopMutation, history, logger, workshopId]);

  const onRenameWorkshop = () => {
    if (!workshop) return;
    presentInputDialog({
      header: "Rename",
      initialText: workshop.name,
      emptyInputMessage: "Please type a workshop name.",
      onAccept: (text) => changeWorkshopName(text),
    });
    logger("Showing rename Workshop dialog");
  };

  const onCreateSection = () => {
    logger("not implemented");

    if (!workshop) return;
    presentInputDialog({
      header: "Section",
      initialText: "",
      emptyInputMessage: "Please type a section name.",
      placeholder: "e.g. Warmup or Games",
      onAccept: (text) => {
        updateWorkshopMutation({
          input: { id: workshop.id, sections: { create: [{ name: text }] } },
        }).then(() => {
          logger('Created new section "%s"', text);
        });
      },
    });
    logger("Showing add section dialog");
  };

  const onChangeDescription = () => {
    logger("not implemented");
    if (!workshop) return;
    presentInputDialog({
      initialText: workshop.description ?? "",
      isMultiline: true,
      header: "Description",
      onAccept: (text) => changeWorkshopDescription(text),
    });
    logger("Showing change description dialog");
  };

  const handleWorkshopEvent = (event: WorkshopActionTypes) => {
    switch (event) {
      case "rename":
        onRenameWorkshop();
        break;
      case "changeDescription":
        onChangeDescription();
        break;
      case "delete":
        onDeleteWorkshop();
        break;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Workshop</IonTitle>
          <IonButtons slot="end">
            {workshop && (
              <WorkshopActionSheetComponent
                workshopFragment={workshop}
                onEvent={(event) => handleWorkshopEvent(event)}
              ></WorkshopActionSheetComponent>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {workshop ? (
          <>
            <IonFab slot="fixed" vertical="bottom" horizontal="end">
              <IonFabButton>
                <IonIcon icon={add}></IonIcon>
              </IonFabButton>
              <IonFabList side="start">
                <IonButton routerLink={routeLibrary({ workshopId })}>
                  Element
                </IonButton>
                <IonButton color="dark" onClick={() => onCreateSection()}>
                  Section
                </IonButton>
              </IonFabList>
            </IonFab>
            <EditableItemComponent
              disableEditing={true}
              text={workshop.name}
              displayName="Workshop Title"
              onChangeText={(newName) => changeWorkshopName(newName)}
              lines="none"
              renderText={(text) => (
                <IonLabel className="ion-text-wrap">
                  <h1 style={{ padding: 0, margin: 0 }}>{text}</h1>
                </IonLabel>
              )}
            ></EditableItemComponent>
            {workshop.description && (
              <EditableItemComponent
                disableEditing={true}
                displayName="Workshop Description"
                text={workshop.description}
                isMultiline={true}
                onChangeText={(text) => changeWorkshopDescription(text)}
                lines="none"
              ></EditableItemComponent>
            )}

            {workshop.sections.length === 1 &&
            workshop.sections[0].elements.length === 0 &&
            !workshop.sections[0].name ? (
              <IonCard>
                <IonCardContent className="ion-padding">
                  <IonText>
                    Use the bottom right button to add elements. Enjoy designing
                    your workshop!
                  </IonText>
                  <IonButton
                    expand="full"
                    fill="clear"
                    routerLink={routeLibrary({ workshopId })}
                  >
                    Add First Element
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ) : (
              <WorkshopElementsComponent
                key={workshop.id}
                workshopId={workshopId}
                workshopSectionsFragment={workshop.sections}
                onChangeOrder={(fromIndex, toIndex) =>
                  changeSectionsOrder(fromIndex, toIndex)
                }
              ></WorkshopElementsComponent>
            )}
          </>
        ) : (
          <IonSpinner></IonSpinner>
        )}
      </IonContent>
    </IonPage>
  );
};
