import * as React from 'react'
import Models from "../../../../../ShadowMS/types/models"
import { Navbar, NavbarBrand, NavItem, NavLink, NavbarNav, Button } from 'mdbreact'

interface P {
  items: Models.INavPage[]
}

export default ({ items, openEditor }: P) => (
  <Navbar className="text-white bg-dark" expand="md">
    <NavbarBrand href={location.origin}>Express</NavbarBrand>
    <NavbarNav left>
      {
        items.map((item, i) => (
          <NavItem key={i}>
            <NavLink className="text-white" to={item.Href}>{item.Name}</NavLink>
          </NavItem>
        ))
      }
    </NavbarNav>
    <NavbarNav right>
      <Button className="" onClick={openEditor}>+</Button>
    </NavbarNav>

  </Navbar>
)