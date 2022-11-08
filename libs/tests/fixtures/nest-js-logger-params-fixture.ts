import { FormatedContentType } from "libs/nest-js-logger/src/types/formated-content-type"


export const makeLoggerParamsFixture = (
): FormatedContentType => ({
    context: 'context',
    message: 'message'
})