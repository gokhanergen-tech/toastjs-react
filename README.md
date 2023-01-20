<a name="readme-top"></a>
<br />
<div align="center">
  <h3 align="center">ToastJS-React</h3>

  <p align="center">
    ToastJS-React provides you create toasts for your responses.
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>CONTENTS</summary>
  <ol>
    <li>
      <a href="#installation">Installation</a>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#show-your-toast">Show Your Toast</a></li>
        <li><a href="#properties">Properties</a></li>
      </ul>
    </li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

### Installation

Follow the instructions to install ToastJS-React

```
$ npm install toastjs-react
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

```jsx
function App() {
  return (
    <ToastContainer maxMessageCount={5}>
      <div className="App">
        
      </div>
    </ToastContainer>
  );
}
```

You must add your app components or elements between
```
<ToastContainer>
``` 
component. 

You can limit your max toasts in your projects using below.

Change Your Maximum Toast 
```js
maxMessageCount={5} // default = 10
```

You could have many toasts in your screen. ToastJS-React is going to add them to a queue. It will show them in order.
For example: 
You have 8 toasts. And you set your max toast = 5 then firstly you are going to see 5 toasts until they become to fade out. Next, 
you are going to see other 3 toasts.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Show Your Toast

```ts
 // Import useGlobalMessage Hook
 import { useGlobalMessage } from './ToastContainer';
 
 // Call It In Your Component
 const toast = useGlobalMessage();

 // And Show It!
 toast.show({
    type: "success",
    message: "You have been added your item succesfully.",
    autoCloseWithTimeout: true,
    timeout: 2000,
});
```

[![Product Name Screen Shot][product-screenshot]](https://github.com/gokhanergen-tech/toastjs-react)

### Properties
```ts
    {
        // Message Which Will Be Shown
        message:string,

        // Type
        type:"info"|"error"|"success"|"warning",

        /* 
        * You can add a timeout for your toast. After this time it will be fade out. 
        * Optional, default = 1000ms
        */
        timeout:number,

        /*
        * If you want to close your toast after timeout. You must set it as "true".
        * Optional, default = false
        */
        autoCloseWithTimeout:boolean,

        /*
        * There is an animation in your toast but you can deactive it below.
        * Optional
        */
        animation:{
            /* 
            * If you do not want to any animation. Set it as "false".
            * Optional, default = true 
            */
            slideAnimation:boolean

            /*
            * You can also add a duration for your animation.
            * Optional, default = 1000
            */
            animationDuration:number
        },

        /*
        * This is your header. You can add an element. It would change depends your type.
        * If you want to custom header change it.
        * Optional, default = null
        */
        header:React.ReactElement,

        /*
        * This is your body. You can add an element.
        * If you want to custom body change it.
        * Optional, default = null
        */
        body:React.ReactElement,

        /*
        * You can change your toast class name with this properties.
        * Optional, default = ".message_wrapper"
        */
        className:string,

        /*
        * This is title of toast. Depends your type.
        * If you want to custom title change it.
        * Optional, default = ""
        */
        title:string,

        /*
        * This is button of toast.
        * Optional
        */
        button:{
            /* 
            * Change class name for your custom style. 
            * Optional, default = ""
            */
            className?:string,

            /* 
            * Change title for your custom button title. 
            * Optional, default = "OK"
            */
            title?:string
        },

        /*
        * You do not have to use our toast component. You can create a custom and define it.
        * Optional, default = null
        */
        Component?: React.FC|React.ComponentClass
    }
```

### Built With

[![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LINKS -->
[product-screenshot]: https://raw.githubusercontent.com/gokhanergen-tech/toastjs-react/main/images/toasts.jpg
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/