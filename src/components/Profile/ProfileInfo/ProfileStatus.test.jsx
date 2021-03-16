import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status='new status'/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('new status');
    });
// })

// describe('ProfileStatus component', () => {
    test('displayed with corect status', () => {
        const component = create(<ProfileStatus status='new status'/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });
// })


// describe('ProfileStatus component', () => {
    test('after creation input should not be displayed ', () => {
        const component = create(<ProfileStatus status='new status'/>);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });
// })
// describe('ProfileStatus component', () => {
    test('after creation span should be displayed with corect status', () => {
        const component = create(<ProfileStatus status='new status'/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe('new status');
    });
// })

// describe('ProfileStatus component', () => {
    test('input should be displayed in editMode instead of span', () => {
        const component = create(<ProfileStatus status='new status'/>);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe('new status');
    });

    test('callback should be called', () => {
        // Фейкова функція
        const  mockCallBack = jest.fn();
        const component = create(<ProfileStatus status='new status' 
                updateStatus={mockCallBack}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        // Перевірка скільки разів буде викликана функція
        expect(mockCallBack.mock.calls.length).toBe(1);
    });
})