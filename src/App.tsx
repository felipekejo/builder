import ReactFlow, { Background, Connection, Controls, Node, addEdge, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

import {zinc} from 'tailwindcss/colors';
import { Square } from './components/nodes/Square';
import { useCallback } from 'react';

const initialNodes = [
  { 
    id: '1', 
    position: { x: 200, y: 400 }, 
    data: {},
    type: 'square',
  },
  { 
    id: '2', 
    position: { x: 600, y: 400 }, 
    data: {},
    type: 'square',
  },
]satisfies Node[];

const NODE_TYPES = {
  square: Square,
};

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  console.log(edges)
  const onConnect = useCallback((connection: Connection)=>{
    return setEdges((edges)=> addEdge(connection, edges))
  },[])

  return (
    <div className='w-screen h-screen'>
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={initialNodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background 
          gap={12}
          size={2}
          color={zinc[200]}
        />
        <Controls/>
      </ReactFlow>
    </div>

  )
}

export default App
