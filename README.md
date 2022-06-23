# Rick and Morty

## Table of contents

- [Visual Studio Code setup](#markdown-header-visual-studio-code-setup)
- [Project setup](#markdown-header-project-setup)
- [Project structure](#markdown-header-project-structure)
- [Component folder structure](#markdown-header-component-folder-structure)
- [Naming best practices](#markdown-header-naming-best-practices)
- [CSS best practices](#markdown-header-css-best-practices)
- [Styled components](#markdown-header-styled-components)

---

## Visual Studio Code setup

We must install these extensions in VS Code before starting to code:

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [StyleLint (v0.87.6)](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)

We also recommend to install these extensions:

- [Live Share Extension Pack](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare-pack)
- [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner)

⬆️ _[Go back to the table of contents](#markdown-header-table-of-contents)_

---

## Project setup

We use Yarn with a yarn.lock file that handles package updates.
To avoid unwanted package updates that can trigger side effects and issues, we should always use:

yarn update

If you want to update the packages to their last minor version, you should do it on a branch created for this purpose and running:

yarn install

This will update the yarn.lock file and it will apear on the pull request.

⬆️ _[Go back to the table of contents](#markdown-header-table-of-contents)_

## Naming best practices

- Lower camel case for files and folders. Ex: src/views/articles/, myComponent, src/views/globalSettings/...

⬆️ _[Go back to the table of contents](#markdown-header-table-of-contents)_

---

## Testing best practices

To avoid falling into the wrong habit of testing implementation details, the tests should resemble the way users interact with your code (component, page, etc.) as much as possible. With this in mind, we recommend **strictly follow** the [order of priority](https://testing-library.com/docs/guide-which-query#priority) set by the dom-testing-library (for the integration/unit tests and the e2e also).

### How to structure tests

To structure the internal code of our tests we recommend following the Arrange/Act/Assert (AAA) pattern. This is a pattern for arranging and formatting the code in the unit test.

It is a good practice for creating your tests in a more natural and convenient way that allows us to read the code more efficiently. The idea is to develop a unit test by following these 3 simple steps:

**Arrange** – setup the testing objects and prepare the prerequisites for your test.

**Act** – perform the actual work of the test.

**Assert** – verify the result.

Lets illustrate this with an example.

```js
  test('click on the close button should trigger a close event', () => {
      # Arrange
      const mockClose = jest.fn();
      render(
          <Toast show onClose={mockClose}>
              Body of toast
          </Toast>
      );

      # Act
      const toast = screen.getByRole('dialog');
      userEvent.click(within(toast).getByRole('button', { name: /close/i }));

      #Assert
      expect(mockClose).toHaveBeenCalledTimes(1);
  });

```

### Other tips or rules

To follow more closely the principles of the [react-testing-library](https://testing-library.com/docs/react-testing-library/intro) we are using the [user-event](https://github.com/testing-library/user-event) library to trigger events since it provides a more advanced simulation of browser interactions than the built-in `fireEvent` method.

⬆️ _[Go back to the table of contents](#markdown-header-table-of-contents)_

---

## CSS best practices

### Units

- Use rem for everything except:

  - box-shadow
  - border
  - outline
  - properties with % in some cases.

- Use ms (miliseconds) instead seconds in animations and transitions. Just for unify.

### Animations

Regular animations: inputs, button, color changes...

Advanced animations: sidebar, dropdowns, toggles...

- Duration:

  - Regular animations: **200ms**
  - Advanced animations: It will **depend** of each case. Consult with design team for the best result.

- Timing function:
  - Regular animations: **ease-in-out**.
  - Advanced animations: play with **cubic-bezier** for the best result.

⬆️ _[Go back to the table of contents](#markdown-header-table-of-contents)_

---

## Styled components

All styled components' name should start with the prefix Styled, for example:

```javascript
const StyledContainer = styled.div`...`;
```

This will also help distinguish on a render styled components from regular components with logic:

```html
<StyledContainer>
    <Header>
    {children}
</StyledContainer>
```

However, if the component is only a styled component and does not have a `*.js` file with logic, the export in the `index.js` file of the component must not start by "Styled", but only include the component's name, to make it agnostic to whether it's a styled component or a component with logic, and avoid issues when importing it in other files.

```javascript
import { StyledAvatar as Avatar } from './avatar.style';

export default Avatar;
```

We use [idiomatic CSS](https://github.com/necolas/idiomatic-css) to order the CSS properties. Stylelint ignores the order for styled mixins, so we can put them wherever we want, usually resets on top and other mixins at the bottom.

```javascript
styled.button`
  ${buttonReset()};

  border: none;
  margin-right: ${rem(32)};
  background: none;
  color: ${colors.dark};
  cursor: pointer;
  list-style: none;

  ${textStyle('body')};
`;
```

Since every `*.style.tsx` file can potentially have several styled components, we will always export them as an object, even if the file only has one styled component. This decision was taken to avoid issues when importing these components in other files. We have disabled the ESlint rule `import/prefer-default-export` for this type of files to avoid the linter warning.

Every `*.style.tsx` file can only be imported from its component file, for example `button.style.tsx` should only be imported from `button.tsx`. There are a few exceptions to this rule:

- You can import a `*.style.tsx` file from another `*.style.tsx` if you need to use a `:hover` from a parent container or a similar effect. You should never extend components from another `*.style.tsx` file.
- You can import a `*.style.tsx` from a `loading.tsx` file on the same folder. We need the same markup on the actual component and its loading state, therefore, we use the same `*.style.tsx` on the render of both components.

```javascript
import { rem } from 'polished';
import styled from 'styled-components';

const StyledSvg = styled.svg`
  width: ${rem(24)};
  height: ${rem(24)};
`;

export { StyledSvg };
```

We'll use $ to prefix any prop that is only meant to be consumed from a styled function. This will avoid props used by styled to end up as html attributes. More info: https://styled-components.com/docs/api#transient-props

⬆️ _[Go back to the table of contents](#markdown-header-table-of-contents)_

---

