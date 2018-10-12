
import { fetchUrl } from './dispatchers/fetch'

export default function (store) {
  store.dispatch(fetchUrl('test.json'))
}
