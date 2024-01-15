import {describe, expect, it, vi, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import Login from '../src/views/Login.vue';
import router from '../src/router/index';

const AxiosMocks = vi.hoisted(() => ({
    get: vi.fn(),
    post: vi.fn(),
}));

vi.mock('../src/router/index', () => ({
    default: {
        push: vi.fn(),
    },
}));

vi.mock('axios', async(importActual) => {
    const actual = await importActual<typeof import ('axios')>();

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

describe('Login', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const wrapper = mount(Login);

    it('It should allow user to login and redirect to Dashboard', async () => {
        const username = 'validusername';
        const password = 'validpassword';

        AxiosMocks.post.mockResolvedValueOnce({ data: { accessToken: 'fake_token' } });

        await wrapper.find('input[name="username"]').setValue(username);
        await wrapper.find('input[name="password"]').setValue(password);
        await wrapper.find('form').trigger('submit.prevent');

        expect(AxiosMocks.post).toHaveBeenCalledWith('/login', {
            username: username,
            password: password
        });
        expect(router.push).toHaveBeenCalledWith({ name: 'Dashboard' });
    });

    it('It should not allow user to login and not redirect to Dashboard', async () => {
        const username = 'invalidusername';
        const password = 'invalidpassword';

        AxiosMocks.post.mockRejectedValueOnce({
            response: {
                status: 401,
                data: {
                    message: 'Invalid login data'
                }
            }
        });

        await wrapper.find('input[name="username"]').setValue(username);
        await wrapper.find('input[name="password"]').setValue(password);

        await wrapper.find('form').trigger('submit.prevent');

        expect(AxiosMocks.post).toHaveBeenCalledWith('/login', {
            username: username,
            password: password
        });
        expect(wrapper.text()).toContain('Invalid login credentials. Please try again.');
        expect(router.push).not.toHaveBeenCalledWith({ name: 'Dashboard' });
    });
});
