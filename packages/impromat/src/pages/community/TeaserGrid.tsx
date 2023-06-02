import { IonCol, IonGrid, IonRow } from "@ionic/react";

interface ContainerProps<ItemData> {
  title: string;
  items: readonly ItemData[];
  itemContent: (item: ItemData) => JSX.Element;
}

export const TeaserGrid = <ItemData extends unknown>({
  title,
  items,
  itemContent,
}: ContainerProps<ItemData>) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h4
          style={{ flexGrow: "1" }}
          className="ion-no-margin ion-padding-top ion-padding-horizontal"
        >
          {title}
        </h4>
        {/* <IonButton slot="end" fill="clear">
              Show all
            </IonButton> */}
      </div>
      <IonGrid>
        <IonRow>
          {items &&
            items.map((item) => (
              <IonCol
                sizeXs="12"
                sizeSm="6"
                sizeMd="4"
                style={{ height: "200px", width: "300px", padding: "4px" }}
              >
                {itemContent(item)}
              </IonCol>
            ))}
        </IonRow>
      </IonGrid>
    </>
  );
};
