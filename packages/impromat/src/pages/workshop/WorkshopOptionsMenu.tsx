import { IonToast } from "@ionic/react";
import { close, copy, create, pencil, trash } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import { ConfirmationAlert } from "../../components/ConfirmationAlert";
import { OptionsMenu } from "../../components/OptionsMenu";
import { FragmentType, getFragmentData, graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useDeleteWorkshopMutation } from "../../hooks/use-delete-workshop-mutation";
import { useDuplicateWorkshopMutation } from "../../hooks/use-duplicate-workshop-mutation";
import { useInputDialog } from "../../hooks/use-input-dialog";
import { useUpdateWorkshopMutation } from "../../hooks/use-update-workshop-mutation";
import { routeWorkshop, routeWorkshops } from "../../routes/shared-routes";

const WorkshopOptionsMenu_Workshop = graphql(`
  fragment WorkshopOptionsMenu_Workshop on Workshop {
    id
    name
    description
  }
`);

interface ContainerProps {
  workshopFragment: FragmentType<typeof WorkshopOptionsMenu_Workshop>;
  goBackAfterDeletion?: boolean;
}

export interface Option {}

/**
 * Options menu for manipulating a Workshop.
 */
export const WorkshopOptionsMenu: React.FC<ContainerProps> = ({
  workshopFragment,
  goBackAfterDeletion,
}) => {
  const logger = useComponentLogger("WorkshopOptionsMenu");
  const workshop = getFragmentData(
    WorkshopOptionsMenu_Workshop,
    workshopFragment,
  );

  const history = useHistory();

  const [presentInputDialog] = useInputDialog();
  const [, deleteWorkshopMutation] = useDeleteWorkshopMutation();
  const [, updateWorkshopMutation] = useUpdateWorkshopMutation();
  const [, duplicateWorkshopMutation] = useDuplicateWorkshopMutation();

  const [isWorkshopDeleteAlertOpen, setIsWorkshopDeleteAlertOpen] =
    useState(false);

  const [duplicatedWorkshop, setDuplicatedWorkshop] = useState<{
    id: string;
    name: string;
  }>();

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
  const onDuplicateWorkshop = async () => {
    if (!workshop) return;
    await duplicateWorkshopMutation({
      input: { workshopId: workshop.id },
    });
    setDuplicatedWorkshop({ id: workshop.id, name: workshop.name });
  };

  const onChangeDescription = () => {
    if (!workshop) return;
    presentInputDialog({
      initialText: workshop.description ?? "",
      isMultiline: true,
      header: "Description",
      onAccept: (text) => changeWorkshopDescription(text),
    });
    logger("Showing change description dialog");
  };

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

  return (
    <>
      <OptionsMenu
        header="Options"
        options={[
          {
            icon: copy,
            text: "Duplicate",
            handler: () => {
              onDuplicateWorkshop();
            },
          },
          {
            icon: pencil,
            text: "Rename",
            handler: () => {
              onRenameWorkshop();
            },
          },
          {
            icon: create,
            text: `${
              workshop.description?.length ? "Change" : "Add"
            } Description`,
            handler: () => {
              onChangeDescription();
            },
          },
          {
            text: "Delete",
            role: "destructive",
            icon: trash,
            handler: () => {
              setIsWorkshopDeleteAlertOpen(true);
            },
          },
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {},
            icon: close,
          },
        ]}
      ></OptionsMenu>
      <ConfirmationAlert
        header="Delete Workshop?"
        confirmText="Delete"
        isOpen={isWorkshopDeleteAlertOpen}
        onConfirm={() => {
          logger("Deletion confirmed");
          deleteWorkshopMutation({ id: workshop.id }).then(() => {
            logger("Deleted workshop");
            if (goBackAfterDeletion) {
              history.push(routeWorkshops(), { direction: "back" });
            }
          });
        }}
        onOpenChange={setIsWorkshopDeleteAlertOpen}
      ></ConfirmationAlert>
      <IonToast
        isOpen={!!duplicatedWorkshop}
        message={`Duplicated "${workshop.name}"`}
        onDidDismiss={() => setDuplicatedWorkshop(undefined)}
        buttons={[
          {
            text: "Open",
            handler: () => history.push(routeWorkshop(duplicatedWorkshop!.id)),
          },
          {
            role: "cancel",
            icon: close,
          },
        ]}
        duration={10000}
      ></IonToast>
    </>
  );
};
