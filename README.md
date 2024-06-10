# Quicks

A pop-up-based app that comprises two alternating tools: (1) message and (2) to-do list. Apart from that, in the [Explanation](#explanation) section, I explain the reasons for my decision to choose a tech stack, code base architecture, and my approach to solving a problem.

For quick hands-on, you can follow the instructions provided in the next section, and, ofc, you can modify the data directly in src/data/inbox.ts. The data that I mentioned is a variable with the names of `inboxes` and `messages`; be aware of `uuid` in both variables.

## Getting Started

> This project uses pnpm as the package manager.

Clone the repository:

```bash
  git clone https://github.com/mdayat/quicks.git
```

Install and run:

```bash
  pnpm install && pnpm dev
```

To check if the code complies with best practices:

```bash
  pnpm check-lint && pnpm check-format
```

Lastly, to check if all the e2e test scenarios pass.

```bash
  pnpm test-e2e
```

## Tech Stack

1. typescript
2. react
3. react-router
4. vite
5. [playwright](https://playwright.dev/)
6. [prettier](https://prettier.io/)
7. [eslint](https://eslint.org/)
8. [husky](https://typicode.github.io/husky/)

## Code Base Architecture

> All business logic lives inside a "src" directory.

- src
  - pages: contains page-related components.
  - components: self-explanatory.
  - utils: contains a set of function utilities related to a page or a component.
  - data: contains dummy data, so you can modify this data to get different results in the UI.
  - hooks: self-explanatory.
  - icons: self-explanatory.
  - api: contains a set of function utilities to mock API request to the server using `promise` and `setTimeout`.
- test: contains testing scenarios; usually it groups different types of testing, such as unit and e2e tests.

> You can ignore the rest of the files in the root directory.

## Explanation

### pnpm

I've already used pnpm for two years, and I'm happy about it. Since it's faster than npm in terms of performance, it's also more efficient in terms of disk usage. Apart from that, I'm using pnpm script in git hooks.

### react, react-router, and vite

I use react because it's a framework (yes, react is a framework) that will be used as described in the job requirements. As for react-router, I simply used it because it's the most popular routing library out there. Lastly, of course, vite is faster than webpack; why not?

### code base architecture

I just simply grouping the same "entity" into a directory; I called it horizontal slice architecture. As the project becomes more complex, restructuring the architecture is needed.

### message processing

Each message definitely has a date to indicate the date it was created. I use that data to sort the message from oldest to newest using bubble sort to get done quickly; a more efficient sorting algorithm like quick sort is encouraged. You can check the sort function in `src/utils/inbox.ts` and see a function with the name `sortMsgFromOldestToNewest`.

Sorted messages are not enough; I need to group these sorted messages to support UI rendering. I chose to use `hashmap` to group this message. In short, each month has a list of dates, and each date has a list of messages. You can check the sort function in `src/utils/inbox.ts` and see a function with the name `groupMsgByDate`. There's still room to make this function better; I'll do it once I have time to make it better.

### playwright

I use Playwright only to do e2e testing. I define e2e testing as a testing method that tests a flow or scenario, like registration flow. Also, it supports various test runners, programming languages, parallel execution, and, yep, I love headless testing. Here's the list of scenarios that need to be tested:

1. Able to create a new message
2. Able to search an inbox or inboxes and see an "empty component" if the searched inbox or inboxes are not found

### husky

I just use husky for all of my projects to support code-checking automation. Husky will help me identify if there's a code that does not comply with our convention described in `eslint` and `prettier`. You can use husky for other scenarios because it allows you to use git hooks easily.
