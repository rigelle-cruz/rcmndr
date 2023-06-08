import { beforeAll, beforeEach, describe, it, expect } from 'vitest'

import db from './connection'
import { getNotifications, setNotifications } from './notifications'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

describe('getNotifications', () => {
  it('returns notifications for a user', async () => {
    const userId = 'auth0|6478f3fd75374ee3d7bc4d94'
    const notifications = await getNotifications(userId)

    expect(notifications).toHaveLength(3)
    expect(notifications).toMatchObject([
      {
        nickname: 'D1am0nd',
        songTitle: 'Cat Fantastic',
        songGenre: 'Math Rock',
      },
      {
        nickname: 'Remmy',
        songTitle: 'I WIll Be Okay Everything',
        songGenre: 'Emo',
      },
      {
        nickname: 'D1am0nd',
        songTitle: 'Mr Milk',
        songGenre: 'Alt Rock',
      },
    ])
  })
})

describe('setNotifications', () => {
  it('marks notifications as read', async () => {
    const userId = 'auth0|6478f3fd75374ee3d7bc4d94'
    const notifications = await getNotifications(userId)
    const notificationIds = notifications.map((n) => n.notificationId)
    await setNotifications(userId, notificationIds)
    const updatedNotifications = await getNotifications(userId)
    expect(updatedNotifications).toHaveLength(0)
  })
})