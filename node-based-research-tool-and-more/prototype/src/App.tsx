import { Tldraw, createShapeId } from 'tldraw'
import 'tldraw/tldraw.css'
import { ResearchNodeShapeUtil } from './shapes/ResearchNodeShape'

// custom shapes array
const customShapeUtils = [ResearchNodeShapeUtil]

function App() {
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw
        shapeUtils={customShapeUtils}
        onMount={(editor) => {
          // create initial root node
          const rootId = createShapeId('root')

          editor.createShape({
            id: rootId,
            type: 'research-node',
            x: 100,
            y: 100,
            props: {
              w: 400,
              h: 250,
              question: 'how do llms work?',
              response: 'large language models are neural networks trained on text.',
              isLoading: false,
            },
          })
        }}
      />
    </div>
  )
}

export default App
