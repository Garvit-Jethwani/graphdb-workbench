import ImportSteps from '../../steps/import-steps';

describe('Import screen validation - server files', () => {

    let repositoryId;

    const BASE_URI = 'http://purl.org/dc/elements/1.1/';
    const CONTEXT = 'http://example.org/context';
    const SUCCESS_MESSAGE = 'Imported successfully';
    const FILE_FOR_IMPORT = 'italian_public_schools_links.nt.gz';
    const TTLS_FOR_IMPORT = 'test_turtlestar.ttls';
    const TRIGS_FOR_IMPORT = 'test-trigstar.trigs';

    beforeEach(() => {
        repositoryId = 'server-import-' + Date.now();
        cy.createRepository({id: repositoryId});
        ImportSteps.visitServerImport(repositoryId);
    });

    afterEach(() => {
        cy.deleteRepository(repositoryId);
    });

    it('Test import Server files successfully without changing settings', () => {
        ImportSteps
            .selectServerFile(FILE_FOR_IMPORT)
            .importServerFiles()
            .verifyImportStatus(FILE_FOR_IMPORT, SUCCESS_MESSAGE)
            .verifyImportStatusDetails(FILE_FOR_IMPORT, '"preserveBNodeIds": false,');
    });

    it('Test import Server files successfully with changing settings', () => {
        ImportSteps.selectServerFile(FILE_FOR_IMPORT)
            .importServerFiles(true)
            .fillBaseURI(BASE_URI)
            .selectNamedGraph()
            .fillNamedGraph(CONTEXT)
            .expandAdvancedSettings()
            .enablePreserveBNodes()
            .importFromSettingsDialog()
            .verifyImportStatus(FILE_FOR_IMPORT, SUCCESS_MESSAGE)
            .verifyImportStatusDetails(FILE_FOR_IMPORT, [CONTEXT, BASE_URI, '"preserveBNodeIds": true,']);
    });

    it('Test import with resetting status of imported file', () => {
        ImportSteps
            .selectServerFile(FILE_FOR_IMPORT)
            .importServerFiles()
            .verifyImportStatus(FILE_FOR_IMPORT, SUCCESS_MESSAGE)
            .resetStatusOfUploadedFile(FILE_FOR_IMPORT)
            .verifyNoImportStatus(FILE_FOR_IMPORT);
    });

    it('Test import turtlestar from Server files successfully without changing settings', () => {
        ImportSteps
            .selectServerFile(TTLS_FOR_IMPORT)
            .importServerFiles()
            .verifyImportStatus(TTLS_FOR_IMPORT, SUCCESS_MESSAGE)
            .verifyImportStatusDetails(TTLS_FOR_IMPORT, '"preserveBNodeIds": false,');
    });
    it('Test import trigstar from Server files successfully without changing settings', () => {
        ImportSteps
            .selectServerFile(TRIGS_FOR_IMPORT)
            .importServerFiles()
            .verifyImportStatus(TRIGS_FOR_IMPORT, SUCCESS_MESSAGE)
            .verifyImportStatusDetails(TRIGS_FOR_IMPORT, '"preserveBNodeIds": false,');
    });

});
