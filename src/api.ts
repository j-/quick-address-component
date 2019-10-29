import { API_HOST, MAX_SEARCH_RESULTS } from './constants';
import { AddressEntity, QueryResultEntity, HasAddressEntities, HasQueryResultEntities } from './entities';

export interface AddressSearchResultItem {
  /**
   * The unique identifier of the returned address within the QAS namespace
   */
  moniker?: string;
  /**
   * Indicates whether the picklist item is an informational item only and does not correspond to any particular address item
   */
  information?: boolean;
  /**
   * Indicates whether this picklist item represents a complete deliverable address
   */
  fullAddress?: boolean;
  /**
   * Indicates whether all of the information in this item is sufficient to make it a complete deliverable address
   */
  incompleteAddress?: boolean;
  /**
   * The picklist item partially formatted into a single string.  The string is not suitable to be displayed as the picklist text, but may be useful in an interactive environment
   */
  partialAddress?: string;
  /**
   * This is the string that should be used in conjunction with the Picklist element for the picklist text. This will contain a postcode only where it is suitable for display purposes. It should not be assumed that this element can be used to determine the postcode of any picklist item.
   */
  postcode?: string;
  /**
   * This is the percentage score that is given to each match returned from a search. This can be used as a guide to the quality of the match produced.
   */
  score?: number;
  /**
   * This element signifies that the picklist item represents multiple addresses, merged into a single entry. This element allows the integrator to display the picklist item with a different icon than a non-multiple entry, if required.
   */
  multiples?: boolean;
  /**
   * This element signifies that the picklist item has been produced by a match to an alias of the item. See Appendix B of the QAS Pro Web Integration Guide for more information about alias matching. This element allows the integrator to display the picklist item with a different icon to a non-alias match, if required.
   */
  aliasMatch?: boolean;
  /**
   * This element signifies that a postcode was searched on, and that the match was made to a newer recoded version of the postcode. This element allows the integrator to display the picklist item with a different icon to a non-alias match, if required.
   */
  postcodeRecoded?: boolean;
  /**
   * This element signifies that a place such as a town was searched on, and that the match was made to an adjacent place. This element allows the integrator to display the picklist item with a different icon to a non-alias match, if required.
   */
  crossBorderMatch?: boolean;
  /**
   * This element signifies that the picklist item represents a set of PO Boxes.
   */
  dummyPOBox?: boolean;
  /**
   * This element signifies that the picklist item is a warning informational item. Unlike a normal informational entry, this will normally be displayed in the picklist when the user should be warned of a situation, such as a search yielding no matches. Informational picklist items are designed to help the user complete the address capture process, and must be displayed in the picklist.
   */
  warnInformation?: boolean;
  /**
   * This element signifies that the picklist item is a range of premises which cannot be expanded, due to a lack of information about the possible elements within the range.
   */
  unresolvableRange?: boolean;
  /**
   * This element signifies that the picklist item is a phantom primary point. A phantom primary point is a premises which is non-deliverable unless the user enters further secondary information. This secondary information may or may not be in the actual data. The user must enter this sub-premises information in order to complete a final address match.
   */
  phantomPrimaryPoint?: boolean;
  /**
   * This element signifies that the picklist item contains names information. This element is only relevant when searching within data mappings that contain Names information, such as GBN.
   */
  name?: boolean;
  /**
   * This is the string that must be displayed to the user for the picklist text. It should be combined with the Postcode element. The main picklist text and postcode have been separated to facilitate integration formatting.
   */
  text?: string;
}

export interface AddressSearchPicklist {
  /**
   * This defines the total number of results that were matched by the search. This number should only be used for display purposes and should not be assumed to be the size of the returned picklist, which will often contain informational items and is restricted by a threshold
   */
  total?: number;
  /**
   * This is the unique identifier of the full returned picklist, within the QAS namespace. Full picklist monikers are typically used when you refine a picklist further, using search text to filter the results.
   */
  moniker?: string;
  /**
   * The actual items returned by the search operation
   */
  items?: Array<AddressSearchResultItem>;
  /**
   * Searches that return a single non-deliverable result that can be stepped into will have this element set to TRUE. Experian Data Quality recommends that the integration should automatically step into the result, without user interaction. This aids address capture efficiency.
   */
  autoStepinSafe?: boolean;
  /**
   * Searches that return a single non-deliverable result that can be stepped into, but that also produce other lesser matches, will have this element set to TRUE. This signifies that the integrator may choose to step into the first picklist result, without user interaction. This aids address capture efficiency.
   */
  autoStepinPastClose?: boolean;
  /**
   * Searches that return too many results to be contained in a picklist will have this element set to TRUE. This signifies that further refinement is required before a picklist containing all of the results can be returned.
   */
  autoStepinSingle?: boolean;
  /**
   * Searches that return a single deliverable result will have this element set to TRUE. Experian Data Quality recommends that the integrator should automatically format the result without user interaction. This aids address capture efficiency.
   */
  autoFormatSafe?: boolean;
  /**
   * Searches that return a single deliverable result, but also produce other lesser matches, will have this element set to TRUE. This signifies that the integrator may choose to format the first picklist result automatically, without user interaction, to aid address efficiency.
   */
  autoFormatPastClose?: boolean;
  /**
   * The original author suggests that this attribute should be included.  However, the QAS documentation does not include a definition or description of this value.  Please refer to Chris Chapman.
   */
  autoFormatSingle?: boolean;
  /**
   * Searches that return too many results to be contained in a picklist will have this element set to TRUE. This signifies that further refinement is required before a picklist containing all of the results can be returned.
   */
  largePotential?: boolean;
  /**
   * Searches that produce more than the maximum number of matches allowed (see the \"Configuration Settings\" section of the QAS Pro Web Installation And Administration Guide) will have this element set to TRUE. This signifies that the search was too broad to match, and that a new search should be performed with more information specified.
   */
  maxMatches?: boolean;
  /**
   * Searches that produce in excess of the picklist threshold may return a subset of the matches in the picklist, plus an informational picklist item that allows the user to access the others. In this situation, this element is set to TRUE.
   */
  moreOtherMatches?: boolean;
  /**
   * Searches that produce in excess of the picklist threshold may only return a single informational picklist item that allows the user to access the full results. In this situation, this element is set to TRUE.
   */
  overThreshold?: boolean;
  /**
   * This signifies that the search exceeded the specified timeout value. If this is unexpected for the given search, this could either signify that the timeout is set too low, or that the search was too broad.
   */
  timeout?: boolean;
  /**
   * This defines a short text prompt that may be displayed to the user in an interactive scenario. This prompts the user as to what should be entered next. For example, 'Enter building number/name or organisation'.
   */
  prompt?: string;
}

export interface FormattedAddressLine {
  /**
   * This element signifies that there were not enough layout lines to contain all of the address line, and that some elements had to overflow onto other lines. If this element is set, then you should either add more output address lines in the specified layout, or specify larger widths.
   */
  overflow?: boolean;
  /**
   * This element signifies that some of the address lines were too short to accommodate all of the formatted address, and so truncation has occurred. If this element is set, then you should either add more output address lines in the specified layout, or specify larger widths.
   */
  truncated?: boolean;
  /**
   * The original author added this item, but it is not apparent what this relates to
   */
  dataPlusGroup?: Array<string>;
  /**
   * This defines a text label for the line, which will describe the contents of the line. For example \"Town\". Line labels may not be returned if multiple elements are fixed to a single line in the layout
   */
  label?: string;
  /**
   * This defines the final formatted address line, as described by the layout that was used to format the address result.
   */
  line?: string;
  /**
   * This describes the elements that are found upon the address line.
   */
  lineType?: 'None' | 'Address' | 'Name' | 'Ancillary' | 'DataPlus';
}

export interface FormattedAddress {
  /**
   * The number of individual lines to be returned to describe the formatted address
   */
  length?: number;
  /**
   * This element signifies that there were not enough layout lines to contain all of the address line, and that some elements had to overflow onto other lines. If this element is set, then you should either add more output address lines in the specified layout, or specify larger widths.
   */
  overflow?: boolean;
  /**
   * This element signifies that some of the address lines were too short to accommodate all of the formatted address, and so truncation has occurred. If this element is set, then you should either add more output address lines in the specified layout, or specify larger widths.
   */
  truncated?: boolean;
  /**
   *
   */
  formattedAddressLines?: Array<FormattedAddressLine>;
}

export interface AddressSearchResults {
  /**
   * A picklist is a structure that contains zero or more candidate addresses satisfying  the search criteria
   */
  addressPickList?: AddressSearchPicklist;
  /**
   * This contains a final formatted address result for specific Verification engine result types.
   */
  address?: FormattedAddress;
  /**
   * The verify level specifies how well the search has been matched, and the appropriate action that can be taken upon the result.
   */
  verifyLevel?: 'None' | 'Verified' | 'InteractionRequired' | 'PremisesPartial' | 'StreetPartial' | 'Multiple';
}

export interface AddressSearchOptions {
  /**
   * Page limit.
   */
  limit?: number;
  /**
   * Page offset
   */
  offset?: number;
  /**
   * The name of the QAS Layout that is to be applied when the engine type is set to &#39;Verification&#39;.  This will dictate the format of the address returned.
   */
  layout?: string;
  /**
   * The type of search engine that is to be used in the search.  In the case of an absent parameter, the default configured search engine will be used.
   */
  engine?: 'Singleline' | 'Verification' | 'Typedown' | 'Intuitive' | 'Keyfinder';
}

export const DEFAULT_OPTIONS: Readonly<AddressSearchOptions> = Object.freeze({
  limit: MAX_SEARCH_RESULTS,
});

export const buildSearchURL = (query: string, options?: AddressSearchOptions): string => {
  const { limit } = Object.assign({}, DEFAULT_OPTIONS, options);
  const queryString = encodeURIComponent(query);
  return `${API_HOST}api/electronicverification/verifications/addresses?limit=${limit}&queryString=${queryString}`;
};

export const quickAddressSearch = async (term: string, options?: AddressSearchOptions): Promise<AddressSearchResults> => {
  const url = buildSearchURL(term, options);
  const res = await fetch(url);
  return await res.json();
};

export type QASResultEntities = HasAddressEntities & HasQueryResultEntities

export const getEntitiesFromQASResult = (queryId: string, result: AddressSearchResults): QASResultEntities => {
  const entities: QASResultEntities = {
    addresses: {},
    queryResults: {},
  };
  if (!result.addressPickList || !result.addressPickList.items) return entities;
  for (const item of result.addressPickList.items) {
    if (item.information) continue;
    const addressId = item.partialAddress!;
    const addressEntity: AddressEntity = {
      id: addressId!,
      label: item.partialAddress!,
      partial: item.partialAddress!,
    };
    entities.addresses[addressId] = addressEntity;
    const queryResultId = queryId + ':' + addressId;
    const queryResultEntity: QueryResultEntity = {
      id: queryResultId,
      queryId,
      addressId,
      score: item.score!,
    };
    entities.queryResults[queryResultId] = queryResultEntity;
  }
  return entities;
};
