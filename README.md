# Example of using Durable Objects along side a Next On Pages app
The `next-on-pages` project is at `apps/app` and the Durable object project is at `apps/api`.

## Setting up
To use DOs in a next-on-pages project, you need to define them in your `wrangler.toml` file in this way:
```toml
[[durable_objects.bindings]]
name = "COUNTERS"
script_name = "counter"
class_name = "Counter"
```

and then before you run your next-on-pages app, in a separate terminal you need to spin up your "counter" worker
(you can't define a DO in your next-on-pages app but use the DO from a different worker).

And so I have setup a [hono.dev](https://hono.dev) app that creates a DO and a next js app that calls the DO using `getRequestContext`.

## How to run this

```sh
# terminal 1
pnpm i
cd apps/api
pnpm dev

# terminal 2 (open a second terminal)
cd apps/app
pnpm dev
```

visit [localhost:3000/api/hello](http://localhost:3000/api/hello) to see an error in your next-on-pages terminal window.

## Error
I am calling the DO inside `api/hello` route using the below code
```ts
export async function GET(request: NextRequest) {
  const counterId = getRequestContext().env.COUNTERS.idFromName('A');
  const stub = getRequestContext().env.COUNTERS.get(counterId);

  const counterValue = await stub.getCounterValue()

  return new Response(counterValue)
}
```

But I get the error
```
Error: Cannot access `Counter#getCounterValue` as Durable Object RPC is not yet supported between multiple `wrangler dev` sessions.
```