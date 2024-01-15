import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Card from "../../src/components/shared/Card.vue";

describe('Card', () => {
    it('It should render Card component with mock data', () => {
        const mockProps = {
            value: 100,
            label: 'Total Value',
            scale: 'million',
            currency: '€',
            icon: 'CurrencyIcon',
            iconClass: 'icon-class',
            customClass: 'custom-class'
        };

        const wrapper = mount(Card, {
            props: mockProps
        });

        const cardValue = wrapper.find('[id="card-value"]').text();
        const cardLabel = wrapper.find('[id="card-label"]').text();
        expect(cardLabel).toContain(mockProps.label);
        expect(cardValue).toContain(`${mockProps.value} ${mockProps.currency} ${mockProps.scale}`);
    });
});
