import { render } from 'preact-render-to-string';

const Fox = ({ nodes, childs, name }: { nodes: number, childs: number, name: string }) => (
    <>
        {childs ? 
            <div className="fox-container">
                {[...Array(nodes)].map((_, index) => (
                    <Fox nodes={nodes} childs={childs - 1} name={`Fox ${name} ${childs} ${index + 1}`} />
                    ))}
            </div> : <span>{`${nodes} ${childs} ${name}`}</span>}
    </>
);

export const renderExample = (nodes: number, childs: number) => render(<Fox nodes={nodes} childs={childs} name={Math.random() + ""} />);