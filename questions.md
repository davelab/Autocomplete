1. What is the difference between Component and PureComponent? give an
   example where it might break my app.

The only difference between Component and PureComponent is a shallow comparison of the previous state and next state, such as, previous porperties and next props, so basically it does PureComponent implement shouldComponentUpdate under the hood.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is
   that?

   the main problem is that shouldComponentUpdate could not propagate the context object change and therefore could not re-render components when they should.

3. Describe 3 ways to pass information from a component to its PARENT.

   - with a callback from a parent component to his child component
   - sharing logic thourgh hooks
   - useContext / Context

4. Give 2 ways to prevent components from re-rendering.

   - memoizing methods and methods results with useMemo and useCallback
   - useRef can also help with the storage of some value

5. What is a fragment and why do we need it? Give an example where it might
   break my app.

   - Fragment allow to render multiple elements at root level of a component
   - Fragment can potentially break the layout

6. Give 3 examples of the HOC pattern.

7. what's the difference in handling exceptions in promises, callbacks and
   async...await.

   - promises with reject callback with .catch()
   - async...await through a try...catch block
   - i didn't get callbacks

8. How many arguments does setState take and why is it async.

   - two arguments and accept also a function as first argument where can we can access current state at the time of the call. the second one can be a callback
   - is async in order to be hable to have multiple setState call in one single scope of a component/hook

9. List the steps needed to migrate a Class to Function Component.

   - create a function instead a class
   - replace all the lifecicles methods with useEffect
   - replace this.setState with useState
   - get props from the arguments
   - get rid of the this keyword scope
   - methods are replaced with function expression
   - get rid of render and replace it with a return statment

10. List a few ways styles can be used with components.

    - with basic css and classNames
    - css/sass modules
    - css-in-js
    - style prop in line with literal object
    - component-level styles (such as styled-components library)

11. How to render an HTML string coming from the server.
    - with ReactDomServer methods
      - streaming methods or renderToString and renderToStaticMarkup
