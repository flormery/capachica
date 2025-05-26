import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventosComponent } from './eventos.component';
import { of } from 'rxjs';
import { EventosService, Evento } from './evento.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('EventosComponent', () => {
  let component: EventosComponent;
  let fixture: ComponentFixture<EventosComponent>;

  const mockEventos: Evento[] = [
    {
      id: 1,
      titulo: 'Evento 1',
      descripcion: 'Desc 1',
      fecha: '2025-12-31', // ✅ fecha clara y futura
      imagen: 'img1.jpg',
      tipo: 'Cultural'
    },
    {
      id: 2,
      titulo: 'Evento 2',
      descripcion: 'Desc 2',
      fecha: '2026-01-01', // ✅ fecha clara y futura
      imagen: 'img2.jpg',
      tipo: 'Cultural'
    }
  ];

  beforeEach(() => {
    const mockService = jasmine.createSpyObj('EventosService', ['getEventos']);
    mockService.getEventos.and.returnValue(of(mockEventos));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, EventosComponent],
      providers: [
        { provide: EventosService, useValue: mockService },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: {}, queryParams: {} } }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(EventosComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería generar eventos de calendario sin filtros', () => {
    component.eventos = [...mockEventos]; // sin filtros
    component.actualizarCalendario();

    expect(component.calendarEvents.length).toBe(2);
    expect(component.calendarEvents[0]?.title).toBe('Evento 1');
  });

  it('debería filtrar por tipo correctamente', () => {
    component.eventos = [...mockEventos];
    component.filtroTipo = 'Cultural'; // este valor sigue existiendo
    component.actualizarCalendario();

    const filtrados = component.eventosFiltrados;
    expect(filtrados.length).toBe(2);
    expect(filtrados[0]?.tipo).toBe('Cultural');
  });
});
