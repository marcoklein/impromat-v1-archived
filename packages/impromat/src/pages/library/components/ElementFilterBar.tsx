import {
  IonChip,
  IonIcon,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { brush, closeCircle, heart } from "ionicons/icons";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { COLOR_LIKE, COLOR_USER_CREATED } from "../../../theme/theme-colors";
import { SearchInputChip } from "./SearchInputChip";

export const ElementFilterBar_Query = graphql(`
  fragment ElementFilterBar_Query on Query {
    tags(take: 200, filter: $elementFilterBarInput) {
      id
      name
      count
    }
  }
`);

interface ContainerProps {
  queryFragment: FragmentType<typeof ElementFilterBar_Query>;
  selectedTagNames: string[];
  loadingAvailableTags: boolean;
  onTagsChange: (tags: string[]) => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  additionalFilter: { liked: boolean; userCreated: boolean };
  onAdditionalFilterChange: (additionalFilter: {
    liked: boolean;
    userCreated: boolean;
  }) => void;
  isExpanded: boolean;
  searchInput: string;
  onSearchInputChange: (input: string) => void;
  /**
   * If true, user specific filters (my element, liked) are shown.
   * False indicates that the user is not logged in.
   */
  enableUserSpecificFilters: boolean;
}

/**
 * Search for a specific workshop element. Search includes all elements from the improbib and all custom elements.
 */
export const ElementFilterBar: React.FC<ContainerProps> = ({
  queryFragment,
  selectedTagNames,
  loadingAvailableTags,
  onTagsChange,
  selectedLanguage,
  onLanguageChange,
  additionalFilter,
  onAdditionalFilterChange,
  isExpanded,
  searchInput,
  onSearchInputChange,
  enableUserSpecificFilters,
}) => {
  const componentName = "ElementFilterBar";
  const tags = getFragmentData(ElementFilterBar_Query, queryFragment).tags;

  const showClearButton = useMemo(
    () =>
      selectedTagNames.length > 0 ||
      additionalFilter.liked ||
      additionalFilter.userCreated ||
      searchInput.length > 0,
    [selectedTagNames, additionalFilter, searchInput],
  );

  const clearInput = useCallback(() => {
    onTagsChange([]);
    onAdditionalFilterChange({ liked: false, userCreated: false });
    onSearchInputChange("");
  }, [onAdditionalFilterChange, onSearchInputChange, onTagsChange]);

  const { t } = useTranslation(componentName);

  return (
    <div className={componentName}>
      {showClearButton && (
        <IonChip onClick={clearInput}>
          <IonIcon icon={closeCircle}></IonIcon>
          <IonLabel>{t("Clear")}</IonLabel>
        </IonChip>
      )}
      {!selectedTagNames.length &&
        !additionalFilter.liked &&
        !additionalFilter.userCreated && (
          <IonChip>
            <IonSelect
              value={selectedLanguage}
              onIonChange={(event) => onLanguageChange(event.detail.value)}
            >
              <IonSelectOption value="en">EN</IonSelectOption>
              <IonSelectOption value="de">DE</IonSelectOption>
            </IonSelect>
          </IonChip>
        )}
      <SearchInputChip
        input={searchInput}
        onInputChange={(input) => onSearchInputChange(input)}
      ></SearchInputChip>
      {!selectedTagNames.length && enableUserSpecificFilters && (
        <>
          <IonChip
            outline={!additionalFilter.liked}
            style={{
              "--background": additionalFilter.liked
                ? "var(--ion-color-primary)"
                : undefined,
            }}
            onClick={() => {
              onAdditionalFilterChange({
                ...additionalFilter,
                liked: !additionalFilter.liked,
              });
            }}
          >
            <IonIcon color={COLOR_LIKE} icon={heart}></IonIcon>
            <IonLabel>{t("Like")}</IonLabel>
          </IonChip>
          <IonChip
            outline={!additionalFilter.userCreated}
            style={{
              "--background": additionalFilter.userCreated
                ? "var(--ion-color-primary)"
                : undefined,
            }}
            onClick={() => {
              onAdditionalFilterChange({
                ...additionalFilter,
                userCreated: !additionalFilter.userCreated,
              });
            }}
          >
            <IonIcon color={COLOR_USER_CREATED} icon={brush}></IonIcon>
            <IonLabel>{t("MyElement")}</IonLabel>
          </IonChip>
        </>
      )}
      {!additionalFilter.liked && !additionalFilter.userCreated && (
        <div
          style={{
            display: isExpanded ? "block" : "inline",
          }}
        >
          {selectedTagNames.map((tagName) => (
            <IonChip
              style={{ "--background": "var(--ion-color-primary)" }}
              key={tagName}
              onClick={() => {
                const newSelectedTagNames = selectedTagNames.filter(
                  (selectedTagName) => selectedTagName !== tagName,
                );
                onTagsChange(newSelectedTagNames);
              }}
            >
              <IonLabel color="light">{tagName}</IonLabel>
            </IonChip>
          ))}
          {tags.map((tag) => (
            <IonChip
              outline
              key={tag.id}
              onClick={() => {
                onTagsChange([...new Set([...selectedTagNames, tag.name])]);
              }}
              disabled={loadingAvailableTags}
            >
              <IonLabel>
                {tag.name} ({tag.count})
              </IonLabel>
            </IonChip>
          ))}
        </div>
      )}
    </div>
  );
};
