import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Summary from "../src/components/Summary.vue";
import Card from "../src/components/shared/Card.vue";
import {nextTick} from "vue";

const AxiosMocks = vi.hoisted(() => ({
    get: vi.fn(),
    post: vi.fn(),
}));

vi.mock('axios', async (importActual) => {
    const actual = await importActual<typeof import('axios')>();
    return {
        default: {
            ...actual.default,
            create: vi.fn(() => ({
                ...actual.default.create(),
                get: AxiosMocks.get,
                post: AxiosMocks.post,
            })),
        },
    };
});

vi.mock('../src/utils/helpers', () => ({
    getScale: vi.fn((value: number) => ''),
    formatCurrency: vi.fn((value: number) => `${value.toLocaleString()}`),
}));

vi.useFakeTimers();

describe('Summary', () => {
    it('It should render Summary component, fetch data and render cards', async () => {
        AxiosMocks.get.mockResolvedValueOnce({ data: 10000 });
        AxiosMocks.get.mockResolvedValueOnce({ data: { totalBalance: 5000 } });
        AxiosMocks.get.mockResolvedValueOnce({ data: 15 });

        const wrapper = mount(Summary, {
            global: {
                stubs: {
                    Card: Card,
                },
            }
        });

        await vi.runAllTicks();
        await nextTick()

        const cards = wrapper.findAllComponents(Card);
        expect(cards.length).toBe(3);

        expect(AxiosMocks.get).toHaveBeenCalledWith('/getTotalInvestmentAmount');
        expect(AxiosMocks.get).toHaveBeenCalledWith('/getSummary');
        expect(AxiosMocks.get).toHaveBeenCalledWith('/getTotalInvestments');

    });
});
