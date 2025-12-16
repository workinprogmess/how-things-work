import { Tldraw, createShapeId } from 'tldraw'
import 'tldraw/tldraw.css'
import { ResearchNodeShapeUtil } from './shapes/ResearchNodeShape'

const customShapeUtils = [ResearchNodeShapeUtil]

function App() {
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw
        shapeUtils={customShapeUtils}
        hideUi
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
              response: 'large language models (llms) are neural networks trained on vast amounts of text data. they learn to predict the next token in a sequence, which allows them to generate coherent text.\n\nkey components include:\n• transformer architecture\n• attention mechanisms\n• tokenization\n• training on massive datasets',
              isLoading: false,
              parentNodeId: null,
            },
          })

          // center the view
          editor.zoomToFit()
        }}
      />
    </div>
  )
}

export default App
