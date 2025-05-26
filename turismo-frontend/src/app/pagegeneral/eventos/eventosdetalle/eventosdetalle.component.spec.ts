import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventosdetalleComponent } from './eventosdetalle.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { EventosService, Evento } from '../evento.service';

describe('EventosdetalleComponent', () => {
  let component: EventosdetalleComponent;
  let fixture: ComponentFixture<EventosdetalleComponent>;
  let mockEventosService: jasmine.SpyObj<EventosService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const fakeEvento: Evento = {
    id: 1,
    titulo: 'Evento de prueba',
    descripcion: 'Descripción de prueba',
    fecha: '2025-12-01',
    imagen: 'test.jpg',
    tipo: 'Cultural'
  };

  beforeEach(async () => {
    const routeMock = {
      snapshot: {
        paramMap: {
          get: (key: string) => '1' // Simula ID de evento = 1
        }
      }
    };

    mockEventosService = jasmine.createSpyObj('EventosService', ['getEventoById']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [EventosdetalleComponent], // ✅ standalone se importa, no se declara
      providers: [
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: Router, useValue: mockRouter },
        { provide: EventosService, useValue: mockEventosService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosdetalleComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar un evento por ID exitosamente', () => {
    mockEventosService.getEventoById.and.returnValue(of(fakeEvento));
    fixture.detectChanges(); // ejecuta ngOnInit()

    expect(mockEventosService.getEventoById).toHaveBeenCalledWith(1);
    expect(component.evento).toEqual(fakeEvento);
    expect(component.isLoading).toBeFalse();
    expect(component.errorMessage).toBeNull();
  });

  it('debería mostrar error si getEventoById falla', () => {
    mockEventosService.getEventoById.and.returnValue(throwError(() => new Error('Fallo API')));
    fixture.detectChanges();

    expect(component.evento).toBeUndefined();
    expect(component.isLoading).toBeFalse();
    expect(component.errorMessage).toBe('Error al cargar el evento.');
  });

  it('debería redirigir al listado al llamar regresarAListado()', () => {
    component.regresarAListado();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/eventos']);
  });
});
