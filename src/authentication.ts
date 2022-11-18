import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
import { LocalStrategy } from '@feathersjs/authentication-local'

import type { Application, HookContext } from './declarations'

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService
  }
}

export const authentication = (app: Application) => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())

  app.use('authentication', authentication)
  app.service('authentication').hooks({
    around: {
      create: [
        async (context: HookContext, next) => {
          const { app, data } = context
          if (data.strategy === 'local') {
            const [user] = (await app.service('users').find({
              query: { email: data.email },
              paginate: false,
            })) as unknown as any[]

            if (!user) {
              const { email, password } = data
              await app.service('users').create({ email, password })
            }
          }

          return next()
        },
      ],
    },
  })
}
