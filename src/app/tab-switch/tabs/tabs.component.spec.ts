import {Component, NO_ERRORS_SCHEMA, QueryList} from '@angular/core';
import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {TabComponent} from './tab.component';
import {TabsComponent} from './tabs.component';
import {IconComponent} from '../../icon/icon.component';

// We need to wrap the TabsComponent in a mock component when testing, to have the TabComponent instances initialized:
@Component({
    selector: 'test-bg-tabs',
    template: `<bg-tabs>
        <bg-tab tabTitle="Google" tabIcon="google"></bg-tab>
        <bg-tab tabTitle="Meta" tabIcon="meta"></bg-tab>
        <bg-tab tabTitle="Microsoft" tabIcon="microsoft"></bg-tab>
    </bg-tabs>`,
})
class MockTabsComponent {}


describe('TabsComponent', (): void => {
    let component: TabsComponent;
    let fixture: ComponentFixture<MockTabsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                IconComponent,
                MockTabsComponent,
                TabComponent,
                TabsComponent
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MockTabsComponent);
        component = fixture.debugElement.children[0].componentInstance;

        fixture.detectChanges();
    });

    it('should initialize the tabPanes correctly (amount of, and selected activePane)', () => {
        component.ngAfterContentInit();

        expect(component.tabPanes.length).toBe(3);

        const selectedTabs = component.tabPanes.filter((tab: TabComponent) => tab.selected);
        expect(selectedTabs.length).toBe(1);
        expect(selectedTabs[0].tabTitle).toBe('Google');
    });

    it('should emit the title of the third tab after triggering the click event', () => {
        spyOn(component.tabSelected, 'emit');
        component.selectTab({tabTitle: 'Microsoft', tabIcon: 'microsoft', selected: false});
        expect(component.tabSelected.emit).toHaveBeenCalledWith('Microsoft');
    });
});
