import React, { Component } from 'react';
import ReactDOM from "react-dom"
import Tabs from './components/Tabs';
import {NewTabs, Tab, TabList, TabPanels, TabPanel} from './components/NewTabs/index';
import {DataTabs} from './components/DataTabs/index';
import Greeting from './components/HOC/Greeting';
import withMouse from './components/HOC/withMouse';
import withCat from './components/HOC/withCat';
import Mouse from './components/RenderProps/Mouse';
import Scroll from './components/RenderProps/Scroll';
 class App extends React.Component {
  render() {
    const {x, y} = this.props.mouse;
    return (
        <div>
            <Mouse>
                {mouse => (
                    
                    <div>
                        ({mouse.x}, {mouse.y})
                        <h2>Old Tabs</h2>
                        <Tabs data={this.props.countries}  
                            tabsOnBottom={true}
                            disabled={[1]}
                        />

                        <hr/>

                        <h2>New Tabs</h2>
                        <NewTabs>
                        <div>
                            <TabList>
                            <Tab>Tab 1</Tab>
                            <Tab isDisabled>Disabled Tab 2</Tab>
                            <Tab>Tab 3</Tab>
                            </TabList>
                        </div>
                        <div>
                            <TabPanels>
                            <TabPanel>Content 1</TabPanel>
                            <TabPanel>Content 2</TabPanel>
                            <TabPanel>Content 3</TabPanel>
                            </TabPanels>
                        </div>
                        </NewTabs>

                        <hr/>
                        <h2>Data Tabs </h2>
                        <DataTabs data={this.props.countries} />

                        <hr/>
                        <h2>HOC </h2>
                        <Greeting />

                        <h2>Mouse</h2>
                        <h2>The mouse position is ({x}, {y}) </h2>

                        <h2>Mouse: Render props example </h2>

                        <h2>Scroll: Render props</h2>
                    
                    </div>
                
                )}
            </Mouse>

            <Scroll render={(y) => (
                <h3>From scroll {y} </h3>
            )} />
        </div>
    )
  }
}

export default withMouse(withCat(App));

