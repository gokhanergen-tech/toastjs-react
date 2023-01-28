import {ToastContainer}  from '.'
import { render} from '@testing-library/react'
import React from 'react'
import App from './test_components/App'


describe('ExampleComponent', () => {
  it('is truthy', () => {
    expect(ToastContainer).toBeTruthy()
  })

  it("testUseGlobal",()=>{
     const renderer=render(<ToastContainer>
         <App></App>
     </ToastContainer>)
     const h1=renderer.getByText("Hello");
     expect(h1).toBeTruthy(); 
  })
})
