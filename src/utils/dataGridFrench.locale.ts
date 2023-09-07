/* eslint-disable import/no-extraneous-dependencies */
import { GridLocaleText } from '@mui/x-data-grid';

const frenchLocaleText: Partial<GridLocaleText> = {
  // Root
  noRowsLabel: 'Aucune ligne',

  // Density selector toolbar button text
  toolbarDensity: 'Densité',
  toolbarDensityLabel: 'Densité',
  toolbarDensityCompact: 'Compacte',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Confortable',

  // Columns selector toolbar button text
  toolbarColumns: 'Colonnes',

  // Filters toolbar button text
  toolbarFilters: 'Filtres',
  toolbarFiltersLabel: 'Afficher les filtres',
  toolbarFiltersTooltipHide: 'Masquer les filtres',
  toolbarFiltersTooltipShow: 'Afficher les filtres',
  toolbarFiltersTooltipActive: (count: any) =>
    count !== 1 ? `${count} filtres actifs` : `${count} filtre actif`,

  // Export selector toolbar button text
  toolbarExport: 'Exporter',
  toolbarExportLabel: 'Exporter',
  toolbarExportCSV: 'Exporter en CSV',

  // Columns panel text
  columnsPanelTextFieldLabel: 'Rechercher une colonne',
  columnsPanelTextFieldPlaceholder: 'Nom de la colonne',
  columnsPanelDragIconLabel: 'Réorganiser la colonne',
  columnsPanelShowAllButton: 'Tout afficher',
  columnsPanelHideAllButton: 'Tout masquer',

  // Filter panel text
  filterPanelAddFilter: 'Ajouter un filtre',
  filterPanelDeleteIconLabel: 'Supprimer',
  filterPanelOperator: 'Opérateurs',
  filterPanelOperatorAnd: 'Et',
  filterPanelOperatorOr: 'Ou',
  filterPanelColumns: 'Colonnes',
  filterPanelInputLabel: 'Valeur',

  // Filter operators text
  filterOperatorContains: 'contient',
  filterOperatorEquals: 'égal à',
  filterOperatorStartsWith: 'commence par',
  filterOperatorEndsWith: 'se termine par',
  filterOperatorIs: 'est',
  filterOperatorNot: "n'est pas",
  filterOperatorOnOrAfter: 'le ou après',
  filterOperatorBefore: 'avant',
  filterOperatorAfter: 'après',
  filterOperatorOnOrBefore: 'le ou avant',
  filterOperatorIsEmpty: 'vide',
  filterOperatorIsNotEmpty: 'non vide',
  filterOperatorIsAnyOf: 'un des',

  // Filter values text
  filterValueAny: 'Tout',
  filterValueTrue: 'Vrai',
  filterValueFalse: 'Faux',

  // Column header menu
  columnMenuShowColumns: 'Afficher les colonnes',
  columnMenuHideColumn: 'Masquer la colonne',
  columnMenuSortAsc: 'Trier par ordre croissant',
  columnMenuSortDesc: 'Trier par ordre décroissant',
  columnMenuManageColumns: 'Gérer les colonnes',

  // Pagination
  MuiTablePagination: {
    labelRowsPerPage: 'Lignes par page',
    labelDisplayedRows(paginationInfo) {
      return `${paginationInfo.from}-${paginationInfo.to} de ${paginationInfo.count}`;
    },
  },
};

export default frenchLocaleText;
