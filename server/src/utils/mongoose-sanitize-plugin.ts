export function sanitizeJson(schema: any) {
  schema.set('toJSON', {
    transform: (doc: any, ret: any) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
    versionKey: false,
  });
}
