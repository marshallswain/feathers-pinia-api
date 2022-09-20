import Ajv, { AnySchemaObject } from 'ajv'
import addFormats from 'ajv-formats'
import { ObjectId } from 'mongodb'

export { Infer, validateData, validateQuery, schema, queryProperty } from '@feathersjs/schema'

// Reusable `convert` keyword.
const keywordConvert = {
  keyword: 'convert',
  type: 'string',
  compile(schemaVal: boolean, parentSchema: AnySchemaObject) {
    if (!schemaVal) return () => true

    // Update date-time string to Date object
    if (['date-time', 'date'].includes(parentSchema.format)) {
      return function (value: string, obj: any) {
        const { parentData, parentDataProperty } = obj
        console.log(value)
        parentData[parentDataProperty] = new Date(value)
        return true
      }
    }
    // Update objectid string to ObjectId
    else if (parentSchema.format === 'objectid') {
      return function (value: string, obj: any) {
        const { parentData, parentDataProperty } = obj
        // Update date-time string to Date object
        parentData[parentDataProperty] = new ObjectId(value)
        return true
      }
    }
    return () => true
  },
} as const

// Reusable `ObjectId` Formatter
const formatObjectId = {
  type: 'string',
  validate: (id: string | ObjectId) => {
    if (ObjectId.isValid(id)) {
      if (String(new ObjectId(id)) === id) return true
      return false
    }
    return false
  },
} as const

// Create a custom AJV
export const ajv = new Ajv({
  coerceTypes: true,
  useDefaults: true,
  schemas: [],
})
addFormats(ajv)
ajv.addKeyword(keywordConvert)
ajv.addFormat('objectid', formatObjectId)

// Create a custom AJV instance that doesn't coerce types
export const ajvNoCoerce = new Ajv({
  coerceTypes: false,
  useDefaults: true,
  schemas: [],
})
addFormats(ajvNoCoerce)
ajvNoCoerce.addKeyword(keywordConvert)
ajvNoCoerce.addFormat('objectid', formatObjectId)
