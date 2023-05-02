import React, { useState } from 'react';

import './App.css';
import { Button } from 'antd';
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined}  from '@ant-design/icons'
import { Layout, Menu, Breadcrumb, MenuProps, theme, Row, Col } from 'antd';
import { Header, Content, Footer } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import Card from 'antd/es/card/Card';
import RootStore from './mst/store/RootStore';
import { observer } from 'mobx-react-lite';
import storeProvider from './mst/store/StorePProvider';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Victor', '1'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Autovehicul', '6')]),
  getItem('Files', '9', <FileOutlined />),
];

const AutovehiculCards=[ 
  { 
    producator: 'Boeing',
    model: '737',
    capacitate: 150,
    nivelCombustibil: 10000,
    esteInZbor: false,
      image: "/Av.webp"
  }, 
  { 
    producator: 'Airbus',
    model: 'A320',
    capacitate: 180,
    nivelCombustibil: 15000,
    esteInZbor: true,
    image: "/avi.jpg"
  }, 
  { 
    producator: 'Embraer',
    model: 'E175',
    capacitate: 88,
    nivelCombustibil: 8000,
    esteInZbor: false,
    image: "/avio.webp"
  } 
]

const App = observer(() => { 
  const {contents, contents_notes, addNote, removeNote} = storeProvider
  const [collapsed, setCollapsed] = useState(false);
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [anul, setAnul] = useState('')
  const [email, setEmail] = useState('')
  const [cards, setCards] = useState<{
    title: string
    name: string
    anul: string
    email: string
  }[]>([])

  return (
    <div className="App">
     <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: "#237158" }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Pahomea Tudor</Breadcrumb.Item>
          </Breadcrumb>
          
          <div style={{ padding: 24, minHeight: 360, background: "#93949B" }}>
            <form onSubmit={(e) => {
              e.preventDefault()
              console.log('Date: ',title, name, anul, email)
              setCards([...cards, {
                title,
                name,
                anul,
                email
              }])
              
            }}>
               <Row justify="center" style={{
                marginBottom: "20px"
                
              }}>

                <Col span={6}>
                <label>
                Marca:
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </label>
                </Col>
              </Row>

              <Row justify="center" style={{
                marginBottom: "20px"
              }}>
                <Col span={6}>
                <label>
                  Modelul:
                  <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label>
                </Col>
              </Row>

                <Row justify="center" style={{
                marginBottom: "20px"
              }}>
                <Col span={6}>
                <label>
                Anul:
                  <input type="anul" value={anul} onChange={e => setAnul(e.target.value)} />
                </label>
                </Col>
                </Row>

              <Row justify="center" style={{
                marginBottom: "20px"
              }}>
              <Col span={6}>
                <label>
                Email:
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
              </label>
                </Col>
              </Row>

              <Row justify="center">
                <Col span={6}>
                  <button>Submit</button>
                </Col>
              </Row>

              <Row justify="center" align="middle" gutter={16} > 
      {AutovehiculCards.map((card, index) => (  
                <Col key={index} span={6}> 
                   <Card title='Avion' style={{ marginTop: "60px" }}>
                    <img src={card.image} style={{width: 100}} />
                    <p>Producator: {card. producator}</p>
                    <p>Model: {card.model}</p>
                    <p>Capacitate: {card.capacitate}</p>
                    <p>NivelCombustibil: {card.nivelCombustibil}</p>
                    <p>Incalzire autonoma: {card.esteInZbor}</p>
                  </Card> 
                </Col>   
        ))} 
    </Row>
            </form>
            {cards.map(card => (
              <Card title={card.title} style={{ width: 300, marginTop: "20px" }}>
                <p>Modelul: {card.name}</p>
                <p>Anul: {card.anul}</p>
                <p>Email: {card.email}</p>
              </Card> 
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
    
    {contents.map((noteCategory) => (
  
  <Row
    key={noteCategory?.id}
    justify="center"
    gutter={[16, 16]}
    style={{ margin: "20px", width: "100%" }}
  >
    <Col span={16}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <label>
          {noteCategory.title}:
          <input
            type="text"
            value={noteCategory.notes}
            style={{
              marginLeft: "10px",
            }}
            onChange={(e) =>
              noteCategory.changeNotes(e.target.value)
            }
          />
        </label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => addNote(noteCategory.id)}
          >
            Add
          </Button>
          <Button onClick={() => removeNote(noteCategory.id)}>
            Remove
          </Button>
        </div>
      </div>
    </Col>
  </Row>
))}
<Row justify="center">
  {contents_notes.map((note) => (
    <Col key={note?.id} span={6}>
      <Card style={{ width: 300 }}>
        <p>{note?.notes}</p>
      </Card>
    </Col>
  ))}
</Row>

    </div>
  
  );
  
}
)
export default App;