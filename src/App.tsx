import ReactFlow, { Background, Connection, Controls, Node, addEdge, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import * as Toolbar from '@radix-ui/react-toolbar';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import {zinc} from 'tailwindcss/colors';
import { Square } from './components/nodes/Square';
import { useCallback, useState } from 'react';
import { DefaultEdges } from './components/edges/DefaulEdges';
import { Sequence } from './components/nodes/Sequence';
import { Dialogue } from './components/nodes/Dialogue';

const initialNodes = [
  { 
    id: '1', 
    position: { x: 200, y: 400 }, 
    data: {},
    type: 'square',
  },
]satisfies Node[];

const initialEvents = [
  {
    type: 'square',
    id: '1',
    nextNodeId: null,
  }
]

const EDGE_TYPES = {
  default: DefaultEdges,
};

const NODE_TYPES = {
  square: Square,
  sequence:Sequence,
  dialogue:Dialogue
};

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [value, setValue] = useState('')
  const [events, setEvents] = useState(initialEvents)
  // console.log(edges)
  // console.log(nodes)
  console.log(events)

  // const onConnect = useCallback((connection: Connection)=>{
  //   return setEdges((edges)=> {
  //     addEdge(connection, edges)
  //     console.log(connection)
  //   })
  // },[])

  const onConnect = useCallback((connection: Connection) => {
    setEdges((edges) => addEdge(connection, edges));
  
    setEvents((events) => events.map((event) => {
        if (event.id === connection.source) {
          return { ...event, nextNodeId: connection.target };
        }
 
      return event;
      })
    );
  },[setEdges, setEvents]);
  

  

  function addSquareNode(){
    const createId = crypto.randomUUID()
    setNodes((nodes)=> [
      ...nodes, 
      {
         id: createId, 
         data: {}, 
         type: value, 
         position: { x: 800, y: 400 }
      }
    ])

    setEvents((events)=>{
      return [
        ...events,
        {
          type: value,
          id: createId,
          nextNodeId: null
        },
      ]
    })
  }

  return (
    <div className='w-screen h-screen'>
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        defaultEdgeOptions={{type: 'default'}}
      >
        <Background 
          gap={12}
          size={2}
          color={zinc[200]}
        />
        <Controls/>
      </ReactFlow>
      <Toolbar.Root className='fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border flex justify-between items-center  border-zinc-300 px-8 h-20 w-96 overflow-hidden'>
      <Select.Root value={value} onValueChange={setValue} >
  <Select.Trigger className="items-center rounded inline-flex justify-center px-4 py-0 text-sm h-9 gap-1 bg-white text-violet-500 shadow-sm hover:bg-gray-100" aria-label="Type">
  <Select.Value placeholder="Select" aria-label={value || "Select"}>{value || "Select"}</Select.Value>
    <Select.Icon className="text-violet-500">
      <ChevronDownIcon />
    </Select.Icon>
  </Select.Trigger>
  <Select.Portal>
    <Select.Content className="overflow-hidden bg-white rounded-md">
      <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-violet-500 cursor-default">
        <ChevronUpIcon />
      </Select.ScrollUpButton>
      <Select.Viewport className="p-1">
        <Select.Group>
          <Select.Label className="px-6 text-xs leading-6">Type</Select.Label>
          <Select.Item className="text-xs leading-none rounded-sm flex items-center h-6 px-9 relative select-none text-violet-500" value="dialogue" >
            <Select.ItemText>Dialogue</Select.ItemText>
            <Select.ItemIndicator className="absolute left-0 w-6 inline-flex items-center justify-center">
              <CheckIcon />
            </Select.ItemIndicator>
          </Select.Item>
          <Select.Item className="text-xs leading-none rounded-sm flex items-center h-6 px-9 relative select-none text-violet-500" value="sequence" >
            <Select.ItemText>Sequence</Select.ItemText>
            <Select.ItemIndicator className="absolute left-0 w-6 inline-flex items-center justify-center">
              <CheckIcon />
            </Select.ItemIndicator>
          </Select.Item>
        </Select.Group>
      </Select.Viewport>
      <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-violet-500 cursor-default">
        <ChevronDownIcon />
      </Select.ScrollDownButton>
    </Select.Content>
  </Select.Portal>
</Select.Root>

        
        <Toolbar.Button 
          className='w-32 h-10 rounded bg-violet-500 mt-2 mb-2'
          onClick={addSquareNode}  
        >
          Add
        </Toolbar.Button>
      </Toolbar.Root>
    </div>

  )


}
export default App
