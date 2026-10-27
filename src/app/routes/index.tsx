import { createFileRoute } from '@tanstack/react-router'
import { getNode, HomePage } from '~/pages/home'

export const Route = createFileRoute('/')({
  loader: () => getNode(),
  component: () => <HomePage {...Route.useLoaderData()} />,
})
